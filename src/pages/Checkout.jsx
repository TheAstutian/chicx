import React, {useContext, useState} from 'react'
import { AuthContext, CartContext } from '../ContextStore';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import CheckoutModal from '../components/CheckoutModal';
import { Turnstile } from '@marsidev/react-turnstile';
import axios from 'axios';
import { API_URL } from '../App';



const Guest = ({ setCheckoutStep, setShowModal, guestUser, setGuestUser }) => {
  const [deliveryOption, setDeliveryOption] = useState('pickup'); // 'pickup' or 'delivery'
  const [showAddress, setShowAddress] = useState(false);
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [numberError, setNumberError] = useState('')
  const [addressError, setAddressError] = useState('')
  const [status, setStatus] = useState('')

  const handleOptionChange = (option) => {
      setDeliveryOption(option);
      setShowAddress(option === 'delivery'); 
      setGuestUser(prevGuestUser => ({
        ...prevGuestUser,
        delivery: option === 'delivery'
    }));
  }

  const handleChange = e =>{
    
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? value : value;
    setGuestUser(prev=>({...prev, [name]: newValue}))
   
//        setError(prev => ({ ...prev, [`${name}Error`]: '' }));
}

const verifyTraffic = async (token)=>{
  
  try{

      const payload = {token: token}
      const verifyToken = await axios.post(`${API_URL}/turnstile`, payload)
      if(verifyToken){
          setStatus('solved')
      } 
      return  
  }catch(err){
      console.log(err)
  } 
} 


const submitGuestData = (e)=>{
  e.preventDefault()
  const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+?[\d\s\(\)-]{7,15}$/;
  const addressRegex = /^[a-zA-Z0-9\s.,'#/-]{5,150}$/;
  let isValid = true; 

if(!guestUser.name || guestUser.name===''){
setNameError('Name is required. ') 
isValid = false; 
} if(!nameRegex.test(guestUser.name)){
  setNameError("Name must contain 2-50 characters (letters, spaces, hyphens, apostrophes only).")
  isValid = false; 
} if (!guestUser.email || guestUser.email===""){
  setEmailError('Email is required')
  isValid = false; 
} if(!emailRegex.test(guestUser.email)){
  setEmailError("Please enter a valid email address")
  isValid = false; 
}

if(!guestUser.phone || guestUser.phone===""){
  setNumberError('Phone Number is required')
  isValid = false; 
}
if(!phoneRegex.test(guestUser.phone)){
  setNumberError('Invalid format. Use 7-15 characters (digits, +, spaces, -, ()).')
  isValid = false; 
}

if(guestUser.address && !addressRegex.test(guestUser.address )){
  setAddressError('Invalid address format. Addresses must be within 5 to 150 characters long.') 
  isValid = false; 
  }

if (isValid) {
  setShowModal(true)
}

return 
  
}

  return (
      <div className='p-4 border-t border-gray-200'>
          <h2 className='text-lg font-bold mb-3'>Billing Information </h2>
          <form className='space-y-2'>
          
              <input type="text" placeholder="Name" name="name" id="name" className='w-full p-2 border border-gray-300 text-sm italic rounded' value={guestUser.name} onChange={handleChange} required />
              {nameError&&<p className=' w-full text-red-500 text-xs'>{nameError}</p>}
              <input type="email" name="email" id="email" placeholder="Email (We'll  send order details here)" value={guestUser.email} onChange={handleChange} className='w-full p-2 border text-sm italic border-gray-300 rounded' required />
              {emailError&&<p className=' w-full text-red-500 text-xs'>{emailError}</p>}
              <input type="tel" name="phone" id="phone" placeholder="Phone Number (For updates about your order)" value={guestUser.phone} onChange={handleChange} className='w-full p-2 border border-gray-300 text-sm italic rounded' required />
              {numberError&&<p className=' w-full text-red-500 text-xs'>{numberError}</p>}
              {/* Pickup or Delivery Option */}
              <div className="flex items-center space-x-4 pt-2">
                  <p className='text-sm text-gray-700'> How do you want your goods received?  </p>
                  <label className="flex items-center space-x-1">
                      <input
                          type="radio"
                          name="delivery-option"
                          value='pickup'
                          checked={deliveryOption === 'pickup'}
                          onChange={() => handleOptionChange('pickup')}
                          className='text-tertiary'
                      />
                      <span>Pickup</span>
                  </label>
                  <label className="flex items-center space-x-1">
                      <input
                          type="radio"
                          name="delivery-option"
                          value='delivery'
                          checked={deliveryOption === 'delivery'}
                          onChange={() => handleOptionChange('delivery')}
                          className='text-tertiary'
                      />
                      <span>Delivery</span>
                  </label>
              </div>

              {/* Address Section (Conditional) */}
              {showAddress && (
                  <div className='pt-2'>
                      <h3 className='font-semibold mb-2'>Delivery Address</h3>
                      <input type="text" placeholder="Street Address" name='address1' value={guestUser.address1} onChange={handleChange} className='w-full p-2 border border-gray-300 rounded mb-2' required />
                      {addressError&&<p className=' w-full text-red-500 text-xs'>{addressError}</p>}
                  </div>
              )}
              
              {/* Final step button 
                  //Trigger Modal, new data captured passed as second argument
              */}
              <Turnstile 
                                      siteKey={process.env.REACT_APP_TURNSTILE_SITE_KEY}
                                          onError={() => setStatus('error')}
                                            onExpire={() => setStatus('expired')}
                                      onSuccess={verifyTraffic}
                                       />
              <button 
                  type="submit"
                  className={status!="solved"? 'w-full bg-gray-500 text-sm px-5 py-2.5 text-center font-medium rounded-lg ':'w-full py-2 bg-tertiary text-white font-bold rounded-lg hover:bg-secondary transition'}
                  onClick={submitGuestData}
                  disabled={status==="solved"? false : true}  
              >
                   Order
              </button>
          </form>
      </div>
  );
}; 




const Checkout = () => {

  
  ReactGA.send({
    hitType:"pageview",
    page:"/Checkout",
    title:"Checkout"
  })

    const {cartItems, addToCart, removeFromCart, deleteFromCart, clearCart, cartItemsTotal} = useContext(CartContext);
    const [dropdown, setDropdown] = useState('false')
    const [checkOutStep, setCheckoutStep] = useState('START')
    const [showModal, setShowModal] = useState(false)
    const [userDetails, setUserDetails] = useState(null)
    const [guestUser, setGuestUser] = useState({
      name: '', 
      phone:'',
      email:'',
      delivery:false,
      address1:'',
    })
    const toggleDropdown =()=>{
      setDropdown(!dropdown)
    }
//name,phone,email,address1, delivery:boolean
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

    const {currentUser} = useContext(AuthContext)
    const handleProceedClick=()=>{
      if(currentUser){
        //Trigger Modal with user information passed as second argument. 
       setUserDetails(currentUser)
       setShowModal(true)
        return 
      }  
      setUserDetails(guestUser)
      setCheckoutStep('ACCOUNT_OPTION');
    }

    const AccountOption = ({setCheckoutStep}) =>(
      <div className='p-4 border-t border-gray-200'>
        <h2 className='text-lg font-bold mb-3' > Account</h2>
        <p className='text-gray-600 mb-4'>Do you want to continue as a Guest or Log In/Create Account?</p>        
        <div className='flex space-x-4'>
            <button
                onClick={() => setCheckoutStep('GUEST')}
                className='px-4 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-tertiary transition'
            >
                Continue as Guest
            </button>
            <Link to='/adminlogin'>
            <button
                 className='px-4 py-2 border border-secondary text-secondary font-semibold rounded-lg hover:bg-blue-50 transition'
            >
                Log In / Sign Up
            </button>
            </Link>
           
        </div>
      </div>
    )

//accountoption, guest, newuser

    
  return (
    <div className='w-full'>
        <div className='w-full bg-tertiary p-1 items-center md:px-10'> <h1 className='mx-auto text-center p-1 md:p-2 text-white text-xl md:text-2xl '>Check Out</h1></div>
        
        <div className='md:w-3/5 md:mt-3 md:mb-10 mx-auto md:flex md:flex-row'>

            <div className=' bg-white md:m-1 md:mr-1 md:w-2/3'>
                    <h1 className='pt-5  pb-5 text-center text-black text-xl'>Your Items</h1>
                    <div className=''>
                        {cartItems.map((item)=>(
                                   <div  key={item._id} className='rounded py-5 flex flex-row bg-[#e5e5e5] m-2 '>
                                     
                                 <div className=' w-2/5 p-4 p-2 pt-5'><Link to ={`/products/${item._id}`}><img className='mx-auto w-20 ' src={item.imageUrl} /></Link></div>
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

            <div className='bg-white h-full m-2 md:m-1 md:ml-2 md:pt-20 md:w-1/3 p-3 '>
                <div className='items-center border border-red py-3 '> <p className='text-tertiary text-sm md:text-base font-bold text-center '>Grand Total: ₦{cartItemsTotal} </p></div>
                <div className='p-3'> 
                  <span className='text-gray-500 flex text-sm cursor-pointer' onClick = {()=>setDropdown(!dropdown)}>How it works {dropdown? <MdOutlineKeyboardArrowDown onClick={toggleDropdown} className='mt-1 cursor-pointer'/>: <MdOutlineKeyboardArrowUp onClick={toggleDropdown} className='mt-1 cursor-pointer'/>} </span>
                  {!dropdown&&<div className='leading-4 pt-2'>
                    <span  className='text-xs text-gray-500'>1. Select items </span>
                       <p  className='text-xs text-gray-500'> 2. Click on Proceed</p>
                       <p  className='text-xs text-gray-500'>3. Enter your details. (If you don't have an account yet) </p>
                       <p  className='text-xs text-gray-500'> 4. Order placed! </p>
                       <p  className='text-xs text-gray-500'>  We'll send you an email confirmation about your order and then arrange payment and delivery. Contact will be made via the phone number you've provided.  </p>
                       <p  className='text-xs text-gray-500'> Thank you for shopping with us! </p>
                  </div>
                  }
                  
                </div>
                <div className='p-3 pt-0'> 
                  {checkOutStep==='START' && (
                    <>
                         <p className='text-gray-500 text-sm'>Proceed to payment and arrange delivery?</p>
                         <div className='mx-auto items-center pt-5'> 
                          <button 
                            onClick={handleProceedClick}  className='w-full mx-auto py-1 text-xs bg-amber-400 hover:bg-amber-600 cursor-pointer text-tertiary hover:text-white font-bold text-center border border-yellow-200 rounded-lg'
                            > Proceed 
                            </button>
                          {/*<a href={`https://wa.me/2348145887534?text=${whatsAppCode()}`}><p className=' mx-auto py-1 text-xs bg-amber-400 hover:bg-amber-600 cursor-pointer text-tertiary hover:text-white font-bold text-center border border-yellow-200 rounded-lg'>Proceed</p></a>*/}                          
                          </div>
                    </>
                  )
                  }
                 
                </div>
                       
                <div className='p-3 pt-0'>

                  {checkOutStep === 'ACCOUNT_OPTION' && (
                    <AccountOption setCheckoutStep={setCheckoutStep} />
                  )
                  }
                  {checkOutStep ==='GUEST' && (
                    <Guest setShowModal={setShowModal} setGuestUser={setGuestUser} guestUser={guestUser} setCheckoutStep={setCheckoutStep} />
                  )} 
                

                </div>
            </div>
        </div>

        {
          showModal&& (
            <div className='absolute h-full top-0 w-full backdrop-blur-xl flex flex-col justify-center items-center'>
            <button className='mb-1' onClick={(e)=>{
                e.preventDefault();
                setShowModal(false)
            }}>Close</button>
            <CheckoutModal showModal={showModal} setShowModal={setShowModal} cartItems={cartItems} total={cartItemsTotal} userDetails={currentUser? userDetails: guestUser} />
            </div>
          )
        }
       
     </div>
  )
  
}

export default Checkout