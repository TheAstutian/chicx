import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { API_URL } from '../App';
import { Link } from 'react-router-dom';
import { capitalizeTitle } from '../pages/Products';
import { CartContext } from 'ContextStore';
import {MdAddShoppingCart} from "react-icons/md";

const RelatedProduct = (props) =>{
const{ addToCart}= useContext(CartContext)
const [relatedItems, setRelatedItems] = useState(null)
const [otherItems, setOtherItems] = useState(null)
  const [notification, setNotification] = useState({show:false, message:""})
const id = props.id; 

useEffect (()=>{
    const fetchRelatedItems = async ()=>{
      const Product = await axios.get(`${API_URL}/relateditems/${id}`)
      setRelatedItems(Product.data.relatedItems)
      setOtherItems(Product.data.others)

    }   
    fetchRelatedItems()
    
    return 
}, [id]) 


const showNotification=(message)=>{
  setNotification({show:true, message})
  
  setTimeout(()=>{
    setNotification({show:false, message:''})
  }, 3000)
    }

    const handleAddtoCart = ({item}) =>{
      addToCart(item)
      showNotification(`Item added to your cart!`)
    }


 const ProductCard = ({item}) =>{

        
      return (
        <>
        <div   key={`${item._id}`} className='flex flex-col my-3 pb-3 md:pb-5 bg-white border border-gray-300 w-full max-w-180px md:max-w-[250px] h-68 '> 
                 
                   <div className=' w-full relative aspect-[4/5] overflow-hidden bg-slate-100 '> 
                         <Link to={`/products/${item._id}`} ><img className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 hover:opacity-70' src={item.imageUrl} />
                         <span className="absolute top-0 left-0 m-2 bg-red-600 px-2 text-center text-xs font-normal text-white"> {item.popular? "Popular": ""} </span>
                         {/*<span className="absolute top-5 left-0 m-2 rounded-full bg-red-600 px-2 text-center text-xs font-normal text-white"> {item.deal? "Good deal": ""} </span>*/}
                         </Link>
                    </div>


                    <div className='w-full px-2 md:px-3'>
                    <Link to={`/products/${item._id}`}> 
                       <div className='h-12 md:h-14 md:py-2 md:mb-3'><p className='text-gray-800 mt-2 md:mt-0 text-sm md:text-base line-clamp-2 md:line-clamp-2 md:py-1 mx-auto'>{capitalizeTitle(item.name)}</p></div>
                        </Link>   
                       <div className='flex flex-row justify-between md:px-2'>
                          <div className='flex flex-col'> <span className='text-tertiary font-bold text-sm md:text-base '>₦{Intl.NumberFormat("en-US").format(item.sellingPrice)}     </span><span className='line-through text-xs text-red-500'>{} ₦{item.price}</span></div>
                          <div>
                            <button 
                              onClick= {()=>handleAddtoCart({item})}
                              className='mx-1 px-5 py-2 font-medium text-gray-600 focus:outline-none cursor-pointer rounded-lg border border-gray-400 bg-amber-400 hover:bg-amber-200  focus:z-10 focus:ring-4 focus:ring-gray-100'>
                                <MdAddShoppingCart />
                            </button>
                          </div>
                       </div>

                  {/*}  <p className='hidden text-black text-sm'>Discount: <span className='text-tertiary font-bold md:font-medium'> {item.discount>0? "Yes": "No"}</span> </p>
                    <p className=' hidden text-black text-sm'>Added: <span className='text-gray-500'>{moment(item.date).fromNow()}</span> </p>*/}
                    </div> 

                                      
                  </div>
        </>
      )
     }

    return (
        <>

        <div className="bg-zinc-100">
         {relatedItems? 
         <>
         <div className='mb-5 p-3'>
             <h2 className='pt-3 sm:pt-8 pb-5 sm:text-center text-2xl sm:text-3xl text-tertiary'> You might also like...</h2>
             <div className='grid grid-cols-2 gap-2 md:w-3/5 md:grid-cols-4 md:gap-3 md:justify-center md:mx-auto'>
                
                {relatedItems.map((item)=>(
                    <>
                        <ProductCard item={item}/>
                    </>
                 ))}
             </div>
         </div>

         </>
         :
         <>
                <div className="flex items-center justify-center h-80 w-full text-gray-700">
                <div className=" z-10 -ml-2 h-8 w-8 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" class="animate-spin" fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 16 16">
                    <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 4c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zM12.773 12.773c-1.275 1.275-2.97 1.977-4.773 1.977s-3.498-0.702-4.773-1.977-1.977-2.97-1.977-4.773c0-1.803 0.702-3.498 1.977-4.773l1.061 1.061c0 0 0 0 0 0-2.047 2.047-2.047 5.378 0 7.425 0.992 0.992 2.31 1.538 3.712 1.538s2.721-0.546 3.712-1.538c2.047-2.047 2.047-5.378 0-7.425l1.061-1.061c1.275 1.275 1.977 2.97 1.977 4.773s-0.702 3.498-1.977 4.773z"></path>
                    </svg>
                </div>
                </div>
         </> 
         }

         {otherItems? 
         <>
        
        <div className='mb-5 p-3'>
        <hr className=' col-span-5 h-px bg-gray-400 border-0 md:col-span-0 hidden md:flex'/>
             <h2 className='pt-1 sm:pt-10 pb-5 sm:pb-10 sm:text-center text-2xl sm:text-3xl text-tertiary'> Continue shopping...</h2>
             <div className='grid grid-cols-2 gap-2 md:w-3/5 md:grid-cols-4 md:gap-3 md:justify-center md:mx-auto'>
                

             {otherItems.map((item)=>(
                <>
                    <ProductCard item={item}/>    
                </>
                 ))

             }
             </div>
         </div>
         </>
         : 
         <>
            <div className="flex items-center justify-center h-80 w-full text-gray-700">
            <div className=" z-10 -ml-2 h-8 w-8 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" class="animate-spin" fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 16 16">
                <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 4c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zM12.773 12.773c-1.275 1.275-2.97 1.977-4.773 1.977s-3.498-0.702-4.773-1.977-1.977-2.97-1.977-4.773c0-1.803 0.702-3.498 1.977-4.773l1.061 1.061c0 0 0 0 0 0-2.047 2.047-2.047 5.378 0 7.425 0.992 0.992 2.31 1.538 3.712 1.538s2.721-0.546 3.712-1.538c2.047-2.047 2.047-5.378 0-7.425l1.061-1.061c1.275 1.275 1.977 2.97 1.977 4.773s-0.702 3.498-1.977 4.773z"></path>
                </svg>
            </div>
            </div>
         </>
         }

        {notification.show && (
        <div className="fixed top-5 right-0 m-4 p-2 bg-gray-100 border border-gray-300 font-semibold text-sm text-gray-600 rounded shadow-md">
          {notification.message}
        </div>)}

        </div>
        </>
    )
}

export default RelatedProduct;