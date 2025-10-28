import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../App';
import { Link } from 'react-router-dom';
import { capitalizeTitle } from '../pages/Products';

const RelatedProduct = (props) =>{
const [relatedItems, setRelatedItems] = useState(null)
const [otherItems, setOtherItems] = useState(null)
const id = props.id; 

useEffect (()=>{
    const fetchRelatedItems = async ()=>{
      const Product = await axios.get(`${API_URL}/relateditems/${id}`)
      setRelatedItems(Product.data.relatedItems)
      setOtherItems(Product.data.others)
     console.log(Product.data)
    }   
    fetchRelatedItems()
    
    return 
}, [id]) 


    return (
        <>

        <div className="">
         {relatedItems? 
         <>
         <div className='mb-5 p-3'>
             <h2 className='pt-3 sm:pt-8 pb-5 sm:text-center text-2xl sm:text-3xl text-tertiary'> Other items in the same category...</h2>
             <div className='flex flex-col w-full sm:flex-row md:justify-center'>
                
                {relatedItems.map((item)=>(
                    <>
                    <div   key={`${item._id}`} className='flex flex-row p-2  pl-1 pt-5 m-2 md:my-3 md:p-1 md:flex-col md:border md:border-gray-300 md:w-56 md:h-68 md:rounded-sm'> 
                                       <div className=' flex-none w-32 md:w-full  '> 
                                             <Link to={`/products/${item._id}`} className='relative'><img className='h-32 md:min-h-36 md:max-h-38  md:h-full md:w-full p-1 rounded-lg m-auto hover:opacity-70' src={item.imageUrl} />
                                             <span className="absolute top-0 left-0 m-2 rounded-full bg-red-600 px-2 text-center text-xs font-normal text-white"> {item.popular? "Popular": ""} </span>
                                             {/*<span className="absolute top-5 left-0 m-2 rounded-full bg-red-600 px-2 text-center text-xs font-normal text-white"> {item.deal? "Good deal": ""} </span>*/}
                                             </Link>
                                        </div>
                                        <div className='ml-5  pt-5 flex-1 md:flex-none w-64 md:w-full mr-10  pr-10 md:w-full mr-2 pr-2 md:pt-2 md:mx-2'>
                                      
                                        <Link to={`/products/${item._id}`}> 
                                          <> <span className='text-tertiary font-bold md:font-medium '>₦{Intl.NumberFormat("en-US").format(item.sellingPrice)}     </span><span className='line-through text-xs text-red-500'>{} ₦{item.price}</span></>
                                           <p className='text-black mt-2 md:mt-0 md:text-base line-clamp-3 md:line-clamp-3 md:py-1 mx-auto'>{capitalizeTitle(item.name)}</p>
                                           </Link>   
                                      {/*}  <p className='hidden text-black text-sm'>Discount: <span className='text-tertiary font-bold md:font-medium'> {item.discount>0? "Yes": "No"}</span> </p>
                                        <p className=' hidden text-black text-sm'>Added: <span className='text-gray-500'>{moment(item.date).fromNow()}</span> </p>*/}
                                        </div>                                                           
                                      </div>
                                                       <hr className=' col-span-5 h-px bg-gray-400 border-0 md:col-span-0 md:hidden'/></>
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
             <div className='flex flex-col w-full sm:flex-row md:justify-center'>
                

             {otherItems.map((item)=>(<>
                    <div   key={`${item._id}`} className='flex flex-row p-2  pl-1 pt-5 m-2 md:my-3 md:p-1 md:flex-col md:border md:border-gray-300 md:w-56 md:h-68 md:rounded-sm'> 
                                       <div className=' flex-none w-32 md:w-full  '> 
                                             <Link to={`/products/${item._id}`} className='relative'><img className='h-32 md:h-full md:w-full p-1 rounded-lg m-auto hover:opacity-70' src={item.imageUrl} />
                                             <span className="absolute top-0 left-0 m-2 rounded-full bg-red-600 px-2 text-center text-xs font-normal text-white"> {item.popular? "Popular": ""} </span>
                                             {/*<span className="absolute top-5 left-0 m-2 rounded-full bg-red-600 px-2 text-center text-xs font-normal text-white"> {item.deal? "Good deal": ""} </span>*/}
                                             </Link>
                                        </div>
                                        <div className='ml-5  pt-5 flex-1 md:flex-none w-64 md:w-full mr-10  pr-10 md:w-full mr-2 pr-2 md:pt-2 md:mx-2'>
                                      
                                        <Link to={`/products/${item._id}`}> 
                                          <> <span className='text-tertiary font-bold md:font-medium '>₦{Intl.NumberFormat("en-US").format(item.sellingPrice)}     </span><span className='line-through text-xs text-red-500'>{} ₦{item.price}</span></>
                                           <p className='text-black mt-2 md:mt-0 md:text-base line-clamp-3 md:line-clamp-3 md:py-1 mx-auto'>{capitalizeTitle(item.name)}</p>
                                           </Link>   
                                      {/*}  <p className='hidden text-black text-sm'>Discount: <span className='text-tertiary font-bold md:font-medium'> {item.discount>0? "Yes": "No"}</span> </p>
                                        <p className=' hidden text-black text-sm'>Added: <span className='text-gray-500'>{moment(item.date).fromNow()}</span> </p>*/}
                                        </div> 
                                      </div>
                                       <hr className=' col-span-5 h-px bg-gray-400 border-0 md:col-span-0 md:hidden'/></>
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


        </div>
        </>
    )
}

export default RelatedProduct;