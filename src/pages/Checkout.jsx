import React, {useContext, useState} from 'react'
import { CartContext } from '../ContextStore';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';

const Checkout = () => {

  
  ReactGA.send({
    hitType:"pageview",
    page:"/Checkout",
    title:"Checkout"
  })

    const {cartItems, addToCart, removeFromCart, deleteFromCart, clearCart, cartItemsTotal} = useContext(CartContext);
    const [dropdown, setDropdown] = useState('false')

    const toggleDropdown =()=>{
      setDropdown(!dropdown)
    }

    const whatsAppCode =()=>{
      
      const date = new Date().toLocaleDateString()
      const time = new Date().toLocaleTimeString()
      const greeting= `*** New Goldyvhista Order at ${time} on ${date} ***\n`

        const message= cartItems.map((item)=>(
          `*${item.quantity} ${item.name} @ ₦${item.sellingPrice}/unit, SubTotal: ₦${item.quantity*item.sellingPrice} *\n`
        ))
        const total = ` GRAND TOTAL: ₦${cartItemsTotal}`;
        return (greeting+message+total) 
    }
    
  return (
    <div className='w-full'>
        <div className='w-full bg-tertiary p-1 items-center md:px-10'> <h1 className='mx-auto text-center p-1 md:p-2 text-white text-xl md:text-2xl '>Check Out</h1></div>
        
        <div className='md:w-3/5 md:mt-3 md:mb-10 mx-auto md:flex md:flex-row'>

            <div className=' bg-white md:m-1 md:mr-1 md:w-2/3'>
                    <h1 className='pt-5  pb-5 text-center text-black text-xl'>Your Items</h1>
                    <div className=''>
                        {cartItems.map((item)=>(
                                   <div  key={item._id} className='rounded py-5 md:flex md:flex-row bg-[#e5e5e5] m-2 '>
                                     
                                 <div className=' md:w-2/5 p-4 md:p-2 md:pt-5'><Link to ={`/products/${item._id}`}><img className='mx-auto w-1/2 ' src={item.imageUrl} /></Link></div>
                                 <div className='p-3 pl-12 md:pl-0 w-2/3 mx-auto md:w-3/5'> 
                                        <p className=' text-black text-base text-left font-semibold'>{item.name}</p> 
                                        <p className='text-black text-sm mb-1 font-light'>Price per unit: <b className='text-sm'>₦{item.sellingPrice}</b></p>
                                        <div className='flex flex-row '> 
                                          <span className='flex flex-row border border-secondary rounded-lg text-xs py-1 px-2 bg-secondary'><p className='text-white text-ms font-light '> <b>Quantity: </b></p> <MdOutlineKeyboardArrowDown  size={15} onClick={()=>removeFromCart(item)} className='text-white mt-0.5 ml-1 cursor-pointer' /> <span className='text-gray-300'>{item.quantity}</span> <MdOutlineKeyboardArrowUp size={15} onClick={()=>addToCart(item)} className='text-white mt-0.5 cursor-pointer mr-1 font-light' /> </span>
                                          <span className=" ml-10 cursor-pointer border-black rounded-lg text-xs py-1 px-2 bg-secondary hover:bg-tertiary text-white hover:text-white" onClick={()=>deleteFromCart(item)}>Delete</span>
                                         </div>
                                        <p className='text-black mt-2 text-tertiary font-light'>SubTotal: <b> ₦{item.sellingPrice * item.quantity} </b></p>
                                 </div>
                               </div>
                        )
                        )}
                    </div>
            </div>

            <div className='bg-white h-full m-2 md:m-1 md:ml-2 md:w-1/3 p-3 '>
                <div className='items-center border border-red py-3 '> <p className='text-tertiary text-sm md:text-base font-bold text-center '>Grand Total: ₦{cartItemsTotal} </p></div>
                <div className='p-3'> 
                  <span className='text-gray-500 flex text-sm'>How it works {dropdown? <MdOutlineKeyboardArrowDown onClick={toggleDropdown} className='mt-1 cursor-pointer'/>: <MdOutlineKeyboardArrowUp onClick={toggleDropdown} className='mt-1 cursor-pointer'/>} </span>
                  {!dropdown&&<div className='leading-4 pt-2'>
                    <span  className='text-xs text-gray-300'>Goldyvhista Hubz orders are processed via Whatsapp at the momemnt. Proceeding with this order takes you to our sales department, where we'll iron out payment and delivery, which are the final details of the purchase. </span>
                  </div>
                  }
                  
                </div>
                <div className='p-3 pt-0'> 
                  <p className='text-gray-500 text-sm'>Proceed to payment and arrange delivery?</p>
                  <div className='mx-auto items-center pt-5'> <a href={`https://wa.me/2348145887534?text=${whatsAppCode()}`}><p className=' mx-auto py-1 text-xs bg-amber-400 hover:bg-amber-600 cursor-pointer text-tertiary hover:text-white font-bold text-center border border-yellow-200 rounded-lg'>Proceed</p></a></div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Checkout