import React, {useState, useEffect, useRef, useContext} from 'react';
import axios from 'axios';
import {Link, useLocation, useNavigate} from 'react-router-dom';


import { API_URL } from '../App';
import { AuthContext, CartContext } from '../ContextStore';
import parse from 'html-react-parser';
import ImageGallery from 'react-image-gallery';


import "react-image-gallery/styles/css/image-gallery.css";


const Product = () => {
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
      const Product = await axios.get(`${API_URL}/products/${productId}`)
     setProduct(Product.data)
    }   
    fetchProduct()
    
    return 
}, []) 

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
              className="px-3 py-2 text-sm font-medium text-secondary focus:outline-none bg-white rounded-lg border border-secondary hover:bg-tertiary hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              role="button" 
            > 
               Back to All Items 
      </Link> 

     { currentUserRef.current.type==='admin'? (<><Link 
             to='/NewProduct'
              title="" 
              className="mx-1 px-3 py-2 text-sm font-medium text-white focus:outline-none bg-tertiary rounded-lg border border-gray-200 hover:bg-white hover:border-tertiary hover:text-tertiary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              role="button" 
            > 
               Add New Product
      </Link>
        <Link 
             to='/NewProduct'
             state={product}
              title="" 
              className="mx-1 px-3 py-2 text-sm font-medium text-white focus:outline-none bg-tertiary rounded-lg border border-gray-200 hover:bg-white hover:border-tertiary hover:text-tertiary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              role="button" 
            > 
               Edit Product
      </Link> 
      
        <span
            onClick={deletePost}
            title="" 
            className="mx-1 px-3 py-2 text-sm font-medium text-white focus:outline-none bg-tertiary rounded-lg border border-gray-200 hover:bg-white hover:border-tertiary hover:text-tertiary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            role="button" 
          > 
          Delete Product
          </span>
          </>):('') }


    </div> 
        <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
    <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        <div className="relative shrink-0 max-w-md lg:max-w-lg mx-auto">
          <ImageGallery 
                className="w-full px-5 md:px-0 dark:hidden"
                showBullets={false}
                showFullscreenButton={true}
                showPlayButton={false}
                thumbnailHeight={20}
                thumbnailWidth={20}
                items={galleryImages}
                 />
          {/*<img className="w-full px-5 md:px-0 dark:hidden" src={product.imageUrl? product.imageUrl:"https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"} alt="" />
          <img className="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="" />*/}
        <span className=" absolute top-2 right-2 m-2 rounded-full bg-secondary px-2 text-center text-xs font-normal text-white">{product.discount? `${displayDiscount}% OFF`: null }</span>
        </div>

        <div className="mt-6 sm:mt-8 lg:mt-0">
          <h1
            className="text-xl font-normal md:font-semibold px-5 md:px-1 text-gray-900 text-sm md:text-2xl dark:text-white"
          >{product? product.name : 
           `ApplBack to All-In-One Computer, Apple M1, 8GB RAM, 256GB SSD,
            Mac OS, Pink`}
          </h1>
          <p className='text-black pl-5 md:pl-0 text-sm my-3'>Category: <span className='text-gray-500'>{product.primaryCategory}</span></p>
          
     
          
          <div className="mt-4 sm:items-center px-5 md:px-0 sm:gap-4 md:flex">
            <p
              className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
            >
              ₦ {product.price? formattedNumber : "Not available"}
            </p>
            <p
              className="line-through  py-1 md:py-0 text-gray-900  dark:text-white"
            >
               {product.discount>0? `₦${product.price}` : ""}    
            </p> 

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
            </div>
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
              href={`https://wa.me/2348145887534?text=I'm%20interested%20in%20${product.name}%20.Is%20it%20for%20sale?%20`}
              title=""
              className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-secondary hover:bg-secondary hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              role="button"
            >{/*}
              <svg
                className="w-5 h-5 -ms-2 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>*/}
              Buy now
            </a>

          </div>

          <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
          {product.description? parse(`${product.description}`): `No description listed`}
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
  </>:<p>Loading</p>}
  {notification.show && (
        <div className="fixed top-5 right-0 m-4 p-2 bg-gray-100 border border-gray-300 font-semibold text-xs text-gray-600 rounded shadow-md">
          {notification.message}
        </div>)}
    </div>
  )
}

export default Product