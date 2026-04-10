import React, {useState, useEffect, useRef, useContext} from 'react';
import axios from 'axios';
import {Link, useLocation, useNavigate} from 'react-router-dom';


import { API_URL } from '../App';
import { AuthContext, CartContext } from '../ContextStore';
import parse from 'html-react-parser';
import ImageGallery from 'react-image-gallery';
import { capitalizeTitle } from './Products';
import { FaAngleRight } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

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
const [toggleDescription, setToggleDescription] = useState(false)

const location = useLocation()
const productId = location.pathname.split("/")[2]
const {currentUser} = useContext(AuthContext) 
const currentUserRef = useRef(currentUser)
const{cartItems, addToCart}= useContext(CartContext)
const navigate = useNavigate()

const changeToggleDescription = () =>{
  setToggleDescription(!toggleDescription)
}


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

const ProductDescription = () =>{

  return (
        <div className='flex flex-col w-full'>

        <div className='flex flex-row pb-2 md:justify-between md:pb-5 '> 
          <h1 className='text-md pl-2 md:text-2xl '>Product Description </h1>
          <span className=" p-1 md:p-2 cursor-pointer "> {toggleDescription? <IoMdClose onClick={changeToggleDescription}/> : <FaAngleRight onClick={changeToggleDescription}/> } </span>
        </div>
    {
      toggleDescription? 
      (
          <>
                <div className='prose prose-sm sm:prose-base max-w-none py-2 px-1 '> {/*[&>p]:mb-4 [&>p]:min-h-[0.5rem] [&>h1]:mt-3 [&>h1]:mb-2 [&>ul]:list-disc [&>ul]:ml-2 */}
                  {product.description? parse(`${product.description}`): ` `}
                </div>
          </>
      ): 
null
    }          
        </div>
  )
}

  let displayPrice;
  let displayDiscount;
  if(product){

    displayPrice = product.price-product.discount
    displayDiscount = Math.round(product.discount/product.price*1000)/10
  } 
  const formattedNumber = Intl.NumberFormat("en-US").format(displayPrice)
     
  return (
    <div className=''>{product? <>
    <div className='flex flex-col md:flex-row md:justify-between bg-white md:py-2.5 md:pt-4 md:px-5 md:pl-8'>
    <div className='flex flex-row'>
      <p className='py-3 pl-3 md:pl-10 text-sm md:text-lg text-gray-500 cursor-pointer md:font-normal'>
      {product.primaryCategory} / {product.name}
      </p>
    </div>

     { currentUser? (currentUser.type==='admin'? (<div className='flex flex-row py-3 pl-3 justify-left'>

      <Link 
             to='/products'
              title="" 
              className="px-1 md:px-3 py-1 md:py-2 text-sm font-medium text-secondary focus:outline-none bg-white rounded-lg border border-secondary hover:bg-tertiary hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 "
              role="button" 
            > 
               Back 
      </Link> 
     <Link 
             to='/NewProduct'
              title="" 
              className="mx-1 px-3 py-2 text-sm font-medium text-white focus:outline-none bg-tertiary rounded-lg border border-gray-200 hover:bg-white hover:border-tertiary hover:text-tertiary focus:z-10 focus:ring-4 focus:ring-gray-100 "
              role="button" 
            > 
               Add New 
      </Link>
        <Link 
             to='/NewProduct'
             state={product}
              title="" 
              className="mx-1 px-3 py-2 text-sm font-medium text-white focus:outline-none bg-tertiary rounded-lg border border-gray-200 hover:bg-white hover:border-tertiary hover:text-tertiary focus:z-10 focus:ring-4 focus:ring-gray-100 "
              role="button" 
            > 
               Edit 
      </Link> 
      
        <span
            onClick={deletePost}
            title="" 
            className="mx-1 px-3 py-2 text-sm font-medium text-white focus:outline-none bg-tertiary rounded-lg border border-gray-200 hover:bg-white hover:border-tertiary hover:text-tertiary focus:z-10 focus:ring-4 focus:ring-gray-100 "
            role="button" 
          > 
          Delete 
          </span>
          </div>):('')):('') }


    </div> 


   <section className="pt-2 bg-white md:pt-5 ">
    <div className="flex flex-col">
      <div className=" md:flex md:justify-center  md:gap-10 ">


        <div className="px-4 relative my-5 md:flex md:w-1/3">
          <ImageGallery 
                className=" image-gallery-slide w-full image-gallery-image px-2 md:px-0 h-150"
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
        <span className=" absolute top-2  m-2 rounded-full bg-secondary px-2 text-center text-xs font-normal text-white">{product.discount? `${displayDiscount}% OFF`: null }</span>
        </div>


        <div className="px-4 mt-6 md:flex md:flex-col md:mt-8 ">
          <h1
            className="text-2xl md:font-semibold px-5 md:px-1 text-gray-900 md:text-3xl "
          >{product? capitalizeTitle(product.name) : 
           `Product Name Not Available`}
          </h1>
          <p className=' pl-5 md:pl-0 text-sm my-3 text-gray-500'>{product.primaryCategory}</p>
          
          <div className="mt-4 sm:items-center px-5 md:px-0 sm:gap-4 md:flex">
            <span className="text-2xl font-bold text-black " > ₦ {product.price? formattedNumber+" " : "Not available"} </span>
            <span  className="line-through  py-1 md:py-0 text-red-500 text-xs " >   {product.discount>0? `₦${product.price}` : ""}   </span> 
          </div> 

          <div className="mt-6  sm:mt-8 gap-2 sm:gap-4 flex items-center">
           

            <a
              href={`https://wa.me/2348145887534?text=I'm%20interested%20in%20${product.name}%20.Is%20it%20available?%20`}
              title=""
              className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-secondary hover:bg-secondary hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100"
              role="button"
            >
              Buy now
            </a>

            <span
              onClick={handleAddToCart}
              title=""
              className="flex items-center justify-center py-2.5 px-5 my-2 md:my-0 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-primary hover:bg-primary hover:text-white focus:z-10 focus:ring-4 focus:ring-blue"
              role="button"
            > 
              Add to Cart
            </span>

          </div>

          <hr className="my-6 md:my-8 border-gray-200 " />
            <div>
              <h1 className='text-md pl-2 font-semibold md:text-lg '>Top Highlights</h1>
  <div className=' prose prose-sm pt-2 px-1 prose-li:leading-6 prose-ul:leading-6 md:mx-auto '>
                  {product.highlights? parse(`${product.highlights}`): ` `}
                </div>

              
            </div>
        </div>

      </div>

        <hr className="mt-6 mb-2 md:mt-8 border-1 border-gray-400 " />

        <div className='mx-2 md:w-3/5 md:mx-auto pt-3 px-1 md:px-2 '>

           <ProductDescription />
          </div>

    </div>
  </section>
  <hr className='  h-px bg-gray-400 border-0 md:col-span-0 '/>



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