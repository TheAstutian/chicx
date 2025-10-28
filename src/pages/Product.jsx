import React, {useState, useEffect, useRef, useContext} from 'react';
import axios from 'axios';
import {Link, useLocation, useNavigate} from 'react-router-dom';


import { API_URL } from '../App';
import { AuthContext, CartContext } from '../ContextStore';
import parse from 'html-react-parser';
import ImageGallery from 'react-image-gallery';
import { capitalizeTitle } from './Products';

import "react-image-gallery/styles/css/image-gallery.css";
import ReactGA from 'react-ga4'
import RelatedProduct from '../components/RelatedProduct';


const Product = () => {

  ReactGA.send({
    hitType:"pageview",
    page:"/product",
    title:"Product"
  })

const [product, setProduct] = useState(null)
const [error, setError] = useState(null)
const [notification, setNotification] = useState({show:false, message:""})

const location = useLocation()
const productId = location.pathname.split("/")[2]
const {currentUser} = useContext(AuthContext) 
const currentUserRef = useRef(currentUser)
const{cartItems, addToCart}= useContext(CartContext)
const navigate = useNavigate()

useEffect (()=>{
    const fetchProduct = async ()=>{
      window.scrollTo(0,0)
      const Product = await axios.get(`${API_URL}/products/${productId}`)
     setProduct(Product.data)
    }   
    fetchProduct()
    
    return 
}, [productId]) 

const handleAddToCart=()=>{
  addToCart(product);
  showNotification(`Item added to your cart!`)
}
const showNotification=(message)=>{
  setNotification({show:true, message})
  
  setTimeout(()=>{
    setNotification({show:false, message:''})
  }, 3000)
}

const deletePost= async()=>{
  const confirmation = window.confirm('Are you sure?')
  if(confirmation) {
  try{
    await axios.delete(`${API_URL}/auth/admin-delete/${productId}`)
   
  } catch(err){
    console.log(err)
  }
  alert("Product has been removed from store")
  navigate("/products")
  }
}

let galleryImages = []
const loadImages =(url )=>{
if (product){
  galleryImages.push({
    original: url,
    thumbnail: url
  })
} else return 
}

const imagesLoaded =()=>{

  if(product) { 
    loadImages(product.imageUrl)
    loadImages(product.imageUrl2)
    loadImages(product.imageUrl3)
    loadImages(product.imageUrl4)
  }
}
imagesLoaded()



  let displayPrice;
  let displayDiscount;
  if(product){

    displayPrice = product.price-product.discount
    displayDiscount = Math.round(product.discount/product.price*1000)/10
  } 
  const formattedNumber = Intl.NumberFormat("en-US").format(displayPrice)
     
  return (
    <div className=''>{product? <>
    <div className='flex items-right justify-right bg-white py-2.5 pt-4 px-5 pl-8'>
    <Link 
             to='/products'
              title="" 
              className="px-3 py-2 text-sm font-medium text-secondary focus:outline-none bg-white rounded-lg border border-secondary hover:bg-tertiary hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 "
              role="button" 
            > 
               Back to All Items 
      </Link> 

     { currentUser? (currentUser.type==='admin'? (<><Link 
             to='/NewProduct'
              title="" 
              className="mx-1 px-3 py-2 text-sm font-medium text-white focus:outline-none bg-tertiary rounded-lg border border-gray-200 hover:bg-white hover:border-tertiary hover:text-tertiary focus:z-10 focus:ring-4 focus:ring-gray-100 "
              role="button" 
            > 
               Add New Product
      </Link>
        <Link 
             to='/NewProduct'
             state={product}
              title="" 
              className="mx-1 px-3 py-2 text-sm font-medium text-white focus:outline-none bg-tertiary rounded-lg border border-gray-200 hover:bg-white hover:border-tertiary hover:text-tertiary focus:z-10 focus:ring-4 focus:ring-gray-100 "
              role="button" 
            > 
               Edit Product
      </Link> 
      
        <span
            onClick={deletePost}
            title="" 
            className="mx-1 px-3 py-2 text-sm font-medium text-white focus:outline-none bg-tertiary rounded-lg border border-gray-200 hover:bg-white hover:border-tertiary hover:text-tertiary focus:z-10 focus:ring-4 focus:ring-gray-100 "
            role="button" 
          > 
          Delete Product
          </span>
          </>):('')):('') }


    </div> 
        <section className="pt-8 bg-white md:pt-16 antialiased">
    <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        <div className="relative shrink-0 max-w-md my-5 lg:max-w-lg mx-auto  ">
          <ImageGallery 
                className=" image-gallery-slide image-gallery-image w-full px-5 md:px-0 h-150"
                showBullets={false}
                showFullscreenButton={true}
                showPlayButton={false}
                thumbnailHeight={20}
                thumbnailWidth={20}
                items={galleryImages}
                originalHeight={100}
                 />
          {/*<img className="w-full px-5 md:px-0 dark:hidden" src={product.imageUrl? product.imageUrl:"https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"} alt="" />
          <img className="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="" />*/}
        <span className=" absolute top-2 right-2 m-2 rounded-full bg-secondary px-2 text-center text-xs font-normal text-white">{product.discount? `${displayDiscount}% OFF`: null }</span>
        </div>

        <div className="mt-6 sm:mt-8 lg:mt-0">
          <h1
            className="text-2xl md:font-semibold px-5 md:px-1 text-gray-900 md:text-3xl "
          >{product? capitalizeTitle(product.name) : 
           `ApplBack to All-In-One Computer, Apple M1, 8GB RAM, 256GB SSD,
            Mac OS, Pink`}
          </h1>
          <p className='text-black pl-5 md:pl-0 text-sm my-3'> <span className='text-gray-500'>{product.primaryCategory}</span></p>
          
     
          
          <div className="mt-4 sm:items-center px-5 md:px-0 sm:gap-4 md:flex">
            <span
              className="text-2xl font-normal text-gray-600 sm:text-2xl "
            >
              ₦ {product.price? formattedNumber+" " : "Not available"}
            </span>
            <span
              className="line-through  py-1 md:py-0 text-gray-900  "
            >
               {product.discount>0? `₦${product.price}` : ""}    
            </span> 
              {/*}
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
              </div>
              <p
                className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
              >
                (5.0)
              </p>
              <a
                href="#"
                className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
              >
                345 Reviews
              </a>
            </div>*/}
          </div> 

          <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
           
            <span
              onClick={handleAddToCart}
              title=""
              className="flex items-center justify-center py-2.5 px-5 my-2 md:my-0 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-primary hover:bg-primary hover:text-white focus:z-10 focus:ring-4 focus:ring-blue"
              role="button"
            > 
              Add to Cart
            </span>

            <a
              href={`https://wa.me/2348145887534?text=I'm%20interested%20in%20${product.name}%20.Is%20it%20available?%20`}
              title=""
              className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-secondary hover:bg-secondary hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100"
              role="button"
            >
              Buy now
            </a>

          </div>

          <hr className="my-6 md:my-8 border-gray-200 " />
          {product.description? parse(`${product.description}`): ` `}
{/*}
          <p className="mb-6 px-3 md:px-0 text-gray-500 dark:text-gray-400">{product.description? 
             product.description: 
            `No description listed`}
          </p>
{/*}
          <p className="text-gray-500 dark:text-gray-400">{product.details?
          product.details: 
           ` Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
            Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
            Magic Keyboard or Magic Keyboard with Touch ID.`}
          </p>{*/}
        </div>
      </div>
    </div>
  </section>
  <hr className=' mt-10 col-span-5 h-px bg-gray-400 border-0 md:col-span-0 '/>
<div className='pb-5'>
<RelatedProduct id= {productId}/>
</div>
  
  </>
  
  :
  <div className="flex items-center justify-center h-svh w-full text-gray-700">
  <div className=" z-10 -ml-2 h-8 w-8 animate-bounce">
    <svg xmlns="http://www.w3.org/2000/svg" class="animate-spin" fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 16 16">
      <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 4c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zM12.773 12.773c-1.275 1.275-2.97 1.977-4.773 1.977s-3.498-0.702-4.773-1.977-1.977-2.97-1.977-4.773c0-1.803 0.702-3.498 1.977-4.773l1.061 1.061c0 0 0 0 0 0-2.047 2.047-2.047 5.378 0 7.425 0.992 0.992 2.31 1.538 3.712 1.538s2.721-0.546 3.712-1.538c2.047-2.047 2.047-5.378 0-7.425l1.061-1.061c1.275 1.275 1.977 2.97 1.977 4.773s-0.702 3.498-1.977 4.773z"></path>
    </svg>
  </div>
</div>
  
  }

  {notification.show && (
        <div className="fixed top-5 right-0 m-4 p-2 bg-gray-100 border border-gray-300 font-semibold text-sm text-gray-600 rounded shadow-md">
          {notification.message}
        </div>)}
    </div>
  )
}

export default Product