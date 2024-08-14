import React, {useContext} from 'react'
import { CartContext } from '../ContextStore'
import {CiSquarePlus, CiSquareMinus} from "react-icons/ci"
import{BsCart4} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const Cart = ({showModal, toggle}) => {
    const {cartItems, addToCart, removeFromCart, clearCart, cartItemsTotal} = useContext(CartContext);
    const navigate = useNavigate()
    const toCheckOut = ()=>{
      toggle()
      navigate('/Checkout')
    }
  return (
    <div className='relative scroll-smooth '>
    <div  className={`flex flex-col fixed h-full overflow-y-auto right-0 top-0 z-10 bg-gray-100 md:border-l-2 md:border-b-2 md:border-tertiary  px-2 py-5 w-full md:w-1/4 text-black text-sm transform transition-transform ease-in-out duration-500 ${showModal ? 'translate-x-0' : 'translate-x-full '}`}>
    <div className=' pt-5 flex justify-between  ease-in-out duration-500'>
    <h1 className=" pl-5 ml-5 font-semibold text-lg text-tertiary ">Shopping Cart</h1>
      <div className="mr-5 "><AiOutlineClose size={20} onClick={toggle} className='hover:text-gray-500 cursor-pointer'/></div>
    </div>


    <div className="flex flex-col w-full pt-5">
      {cartItems.map((item) => (<>
        <div className="flex space-x-4 justify-between h-24  pt-5 mb-5" key={item._id}>
          <div className="flex ">
            <div className='h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 p-4'> 
            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover object-center" />
            </div>
           
          </div>
          <div className="flex flex-col w-60">
              <div className='mt-2 h-12'> <span className="text-xs line-clamp-2 font-medium">{item.name}</span></div>

          <div className="flex gap-1">
            <span className='font-medium'>Qty:</span>
           <CiSquareMinus size={20} onClick={()=>{removeFromCart(item)}} className='cursor-pointer'/>
            <p>{item.quantity}</p>          
            <CiSquarePlus size={20} onClick={()=>{addToCart(item)}} className='cursor-pointer'/>
          </div>

        </div>

          
        <div className='flex pt-2 pr-2'>
            <span className="font-medium">₦{item.sellingPrice*item.quantity}</span>
          </div>
          
      </div>
      <hr className=' h-px bg-gray-200 border-0'/></>
      ))}
      
    </div>
    {
      cartItems.length > 0 ? (
        <div className="flex mt-5 md:pt-5 flex-col justify-between items-center">
      <h1 className="text-sm p-3 font-bold">Total: ₦ {cartItemsTotal}</h1>
      <div className='flex space-x-4'>
        
      <p
        className="px-3 py-1 bg-tertiary text-white text-xs hover:cursor-pointer uppercase rounded hover:bg-secondary focus:outline-none focus:bg-gray-700"
        onClick={() => {
          clearCart()
        }}
      >
        Clear cart
      </p>
      
      <span onClick={()=>toCheckOut()}
        className="px-3 py-1 bg-tertiary text-white text-xs hover:cursor-pointer uppercase rounded hover:bg-secondary focus:outline-none focus:bg-gray-700" >
        Checkout
      </span>

        </div>
    </div>
      ) : (
        <div className='py-3 mt-10 flex flex-col'>
          <div className='mx-auto mb-5 pb-5'><BsCart4 size={50}/></div>
          <h1 className="text-lg font-semibold mx-auto">Your cart is empty</h1>
        </div>
      )
    }
    </div>
  </div>)
  
}

export default Cart