import React, {useContext, useState} from 'react'
import { AuthContext, CartContext } from '../ContextStore';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
//import CheckoutModal from '../components/CheckoutModal';
import { Turnstile } from '@marsidev/react-turnstile';
import axios from 'axios';
import { API_URL } from '../App';
import { toggleBlockquote } from '@/components/tiptap-ui/blockquote-button';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


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
    const [emailVerified, setEmailVerified]= useState(false)
    const [orderConfirmed, setOrderConfirmed] = useState(false)

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
/*      if(currentUser){
        //Trigger Modal with user information passed as second argument. 
       setUserDetails(currentUser)
       setShowModal(true)
        return 
      }  */
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
{  /*          <Link to='/adminlogin'>
            <button
                 className='px-4 py-2 border border-secondary text-secondary font-semibold rounded-lg hover:bg-blue-50 transition'
            >
                Log In / Sign Up
            </button>
            </Link>*/
}           
        </div>
      </div>
    )

//accountoption, guest, newuser

    
  return (
    <>
       { 

          showModal? (
            <div className=' h-full top-0 w-full backdrop-blur-xl flex flex-col justify-center items-center'>
            <button className='mb-1' onClick={()=>{
                setShowModal(false)
            }}>Close</button>
            <CheckoutModal 
                showModal={showModal} 
                setShowModal={setShowModal} 
                cartItems={cartItems} 
                clearCart={clearCart}
                total={cartItemsTotal} 
                userDetails={guestUser} 
                orderConfirmed={orderConfirmed} 
                setOrderConfirmed={setOrderConfirmed} 
                setCheckoutStep={setCheckoutStep}
                />
            </div>
          )


        :
        <>
        <div className='w-full bg-tertiary p-1 items-center md:px-10'> <h1 className='mx-auto text-center p-1 md:p-2 text-white text-xl md:text-2xl '>Check Out</h1></div>
        
        <div className='md:w-3/5 md:mt-3 md:mb-10 mx-auto md:flex md:flex-row'>

            <div className=' bg-white md:m-1 md:mr-1 md:w-2/3'>
                    <h1 className='pt-5  pb-5 text-center text-black text-xl'>Your Items</h1>
                    <div className=''>
                        {cartItems.map((item)=>(
                                   <div  key={item._id} className='rounded py-5 flex flex-row bg-[#e5e5e5] m-2 '>
                                     
                                 <div className=' w-2/5 sm:w-1/5 p-2 sm:p-5 sm:pt-6 pt-5'><Link to ={`/products/${item._id}`}><img className='mx-auto  w-25 sm:w-[100px] ' src={item.imageUrl} /></Link></div>
                                 <div className='p-3 md:pl-0 w-2/3 mx-auto pt-5 md:4/5'> 
                                        <p className=' text-black text-base md:text-lg text-left font-semibold'>{item.name}</p> 
                                        <p className='text-black text-xs md:text-sm mb-1 font-light'>Price per unit: <b className='text-xs md:text-sm'>₦{item.sellingPrice}</b></p>
                                        <div className='flex flex-row mt-3'> 
                                          <span className='flex flex-row border border-secondary rounded-lg text-xs py-1 px-2 bg-secondary'><p className='text-white text-ms font-light '> <b>Quantity: </b></p> <MdOutlineKeyboardArrowDown  size={15} onClick={()=>removeFromCart(item)} className='text-white mt-0.5 ml-1 cursor-pointer' /> <span className='text-gray-300'>{item.quantity}</span> <MdOutlineKeyboardArrowUp size={15} onClick={()=>addToCart(item)} className='text-white mt-0.5 cursor-pointer mr-1 font-light' /> </span>
                                          <span className=" ml-5 md:ml-10 cursor-pointer border-black rounded-lg text-xs py-1 px-2 bg-secondary hover:bg-tertiary text-white hover:text-white" onClick={()=>deleteFromCart(item)}>Delete</span>
                                         </div>
                                        <p className='text-black mt-3 md:mt-2 text-tertiary font-light'>SubTotal: <b> ₦{item.sellingPrice * item.quantity} </b></p>
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
                    <Guest setShowModal={setShowModal} setGuestUser={setGuestUser} guestUser={guestUser} emailVerified={emailVerified} setEmailVerified={setEmailVerified} setCheckoutStep={setCheckoutStep} orderConfirmed={orderConfirmed}/>
                  )} 
                

                </div>
            </div>
        </div>
        </>
}
       
     </>
  )
  
}



const Guest = ({ setCheckoutStep, emailVerified, setEmailVerified, setShowModal, guestUser, setGuestUser, orderConfirmed }) => {
  const [deliveryOption, setDeliveryOption] = useState('pickup'); // 'pickup' or 'delivery'
  const [showAddress, setShowAddress] = useState(false);
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [numberError, setNumberError] = useState('')
  const [addressError, setAddressError] = useState('')
  const [verifyEmailError, setVerifyEmailError] = useState('')
  const [status, setStatus] = useState('')
  const [ToggleEmailVerification, setToggleEmailVerification] = useState(false)
  const [emailCode, setEmailCode] = useState('')
  
  

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
  const handleEmailCodeChange = e =>{
   
    const code = e.target.value; 
    setEmailCode(code)
  }

/* const verifyTraffic = async (token)=>{
  
  try{

      const payload = {token: token}
      const verifyToken = await axios.post(`${API_URL}/turnstile`, payload)
      if(verifyToken){
          setStatus('solved')
      } else setStatus('solved') 

      return  
  }catch(err){
      console.log(err)
  } 
} */

const sendEmailVerificationCode = async ()=>{

  try{
   const requestCode= await axios.post(`${API_URL}/tokenRequest`, {email: guestUser.email})
    
    }catch(error){
    if (error.message){
      setEmailError(error.message)
    } else {
            setEmailError(error)
    }
    
  }
  setToggleEmailVerification(true)
  return 
  //send email to backend to generate code. 
}

const submitEmailVerification  = async (e) =>{
  e.preventDefault()
  
  const data = {
    email: guestUser.email , 
    code: emailCode
  }

  try{
    const verifyCode = await axios.post(`${API_URL}/verifyToken`, data)
    console.log(verifyCode)
  if(verifyCode.data.status!="Success"){
    setVerifyEmailError(verifyCode.data.message)
  }else if (verifyCode.data.status==="Success"){
    setEmailVerified(true)
//    setShowModal(true)
  }
  }catch(error){
    console.log(error)
  }
 //logic to verify code. 
//setShowModal(true)
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
  sendEmailVerificationCode()
}

return 
  
} 
  return (<>
     { ToggleEmailVerification || emailVerified? 

     ( 
       emailVerified? 
      orderConfirmed? 
      (
      <div className='p-4 border-t border-gray-200'>
        <h1 className='py-3'>Order Confirmed!</h1>
         <p className=' mb-2'>Your order has been confirmed and an email has been sent to <b>{guestUser.email} </b><br /> <br /> We will contact you via Whatsapp for next steps and processing.</p>
      </div>)
      :
      <div className='p-4 border-t border-gray-200'>
           <h1 className='py-3 text-2xl p-2'> Confirm Your Order</h1>
           <p className='p-3 mb-5'>Thanks for verifying your email. Please confirm your order. </p>
            <button 
                  className='w-full py-2 bg-tertiary text-white font-bold rounded-sm hover:bg-secondary transition'
                  onClick={()=>{setShowModal(true)}}
                  
              >
                   Confirm Order
              </button>
        </div>

       :
      
     <div className='p-4 border-t border-gray-200'>
          <p className=' mb-2'>We have sent a one time passcode to you at your registered address: <b>{guestUser.email} </b><br /> <br /> Please check your email account for your one time passcode and enter it below.</p>
              <input type="text" placeholder="Enter code" name='code' value={emailCode} onChange={handleEmailCodeChange} className='w-full p-2 border border-gray-300 rounded mb-2' required />
              {verifyEmailError&&<p className=' w-full text-red-500 text-xs'>{verifyEmailError}</p>}

              {/*
                logic 
                You can request a new code in...countdown for 2 minutes. 
                After 2 minutes elapses, resend code button popus up and once clicked, 
                goes dark and unclickable until after 2 mins again
              */}
            
             <div className='flex justify-between py-5'>
              <button 
                  type="submit"
                  className='w-full py-2 bg-red-600 text-white font-bold rounded-sm hover:bg-secondary transition mr-2'
                  onClick={()=>setToggleEmailVerification(false)}
                   
              >
                   Back
              </button>
              <button 
                  type="submit"
                  className='w-full py-2 bg-tertiary text-white font-bold rounded-sm hover:bg-secondary transition'
                  onClick={submitEmailVerification}
                  
              >
                   Verify Email
              </button>
             </div>
        </div>
        )

          :
        
        <div className='p-4 border-t border-gray-200'>
          <h2 className='text-lg font-bold mb-3'>Billing Information </h2>
          <form className='space-y-2'>
            <h3 className='font-semibold mb-2'>Name:</h3>          
              <input type="text" placeholder="Please enter your full name" name="name" id="name" className='w-full p-2 border border-gray-300 text-xs italic rounded' value={guestUser.name} onChange={handleChange} required />
              {nameError&&<p className=' w-full text-red-500 text-xs'>{nameError}</p>}
              <h3 className='font-semibold mb-2'>Email: </h3>
              <input type="email" name="email" id="email" placeholder="We'll send your order details here" value={guestUser.email} onChange={handleChange} className='w-full p-2 border text-xs italic border-gray-300 rounded' required />
              {emailError&&<p className=' w-full text-red-500 text-xs'>{emailError}</p>}
              <h3 className='font-semibold mb-2'>Phone number:</h3>              
              <input type="tel" name="phone" id="phone" placeholder="For order updates pls enter a correct number." value={guestUser.phone} onChange={handleChange} className='w-full p-2 border border-gray-300 text-xs italic rounded' required />
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
              
 {   /*          <Turnstile 
                  siteKey={process.env.REACT_APP_TURNSTILE_SITE_KEY}
                      onError={/*() => setStatus('error')* verifyTraffic}
                        onExpire={/*() => setStatus('expired')* verifyTraffic}
                  onSuccess={verifyTraffic}
                    /> */}
              <button 
                  type="submit"
                  className={status!="solved"? 'w-full bg-gray-500 text-sm px-5 py-2.5 text-center font-medium rounded-lg ':'w-full py-2 bg-tertiary text-white font-bold rounded-lg hover:bg-secondary transition'}
                  onClick={submitGuestData}
                  /*{disabled={status==="solved"? false : true}  }*/
              >
                   Order
              </button>
          </form>
      </div>
              
    }

  
 </> );
}; 


  {/*
      emailVerified? 

      orderConfirmed? 
      (
      <div className='p-4 border-t border-gray-200'>
        <h1 className='py-3'>Order Confirmed!</h1>
         <p className=' mb-2'>Your order has been confirmed and an email has been sent to <b>{guestUser.email} </b><br /> <br /> We will contact you via Whatsapp for next steps and processing.</p>
      </div>)
      :
      (
        <div className='p-4 border-t border-gray-200'>
           <h1 className='py-3'>Please confirm your order</h1>
           Thanks for verifying your email. Please confirm your order. 
            <button 
                  type="submit"
                  className='w-full py-2 bg-tertiary text-white font-bold rounded-sm hover:bg-secondary transition'
                  onClick={()=>{setShowModal(true)}}
                  
              >
                   Confirm Order
              </button>
        </div>
    )
      
    */}



const CheckoutModal = (props) =>{

    useEffect(() => { window.scrollTo(0,0); }, [])
    const {cartItems, total, userDetails, 
            showModal, setOrderConfirmed, 
            setShowModal, setCheckoutStep, clearCart } = props;  
    //recieve buyer information and goods information. 
    // And then send data to backend. 
//    console.log(userDetails)
    const [order, setOrder] = useState({
        userDetails: userDetails,
        cart: cartItems,
        total: total, 
    })
    
    const navigate = useNavigate();

    const placeOrder = async ()=>{
        // send order data to backend 
        //return with yes or no alert, then redirect to user page or homepage
        try{
            const order={
                 userDetails: userDetails,
                cart: cartItems,
                total: total, 
            }
            const orderPlaced = await axios.post(`${API_URL}/order`, {order})
           console.log(orderPlaced)
            if (orderPlaced) {
                window.alert('Order Placed')
                setOrderConfirmed(true)
                clearCart()
                setCheckoutStep('GUEST')
                setShowModal(false)
            } else {
                window.alert('there was an error')
            }

        }catch (err){
            console.log(err)
        }
       
    }

    return (
        <>    
                        <div className=" w-full md:min-w-92 md:w-1/2 px-2 md:px-10 md:px-1 md:mx-auto">
                        <div className="flex flex-col p-6 space-y-4 divide-y mx-2 md:mx-10 sm:mx-1 sm:w-92 sm:p-10 divide-gray-700 bg-gray-100 text-gray-900">
                <h2 className="text-2xl font-semibold">Order Details</h2>
                <ul className="flex flex-col pt-4 space-y-2">
                    {
                        cartItems.map((item)=>(
                        <li className="flex items-start justify-between">
                        <h3>{item.name}
                            <span className="text-sm text-primary"> x{item.quantity}</span>
                        </h3>
                        <div className="text-right">
                            <span className="block">₦{item.sellingPrice * item.quantity} </span>
                            <span className="text-sm text-gray-400">at ₦{item.sellingPrice}</span>
                        </div>
                    </li>
                        ))
                    }
                </ul>
                <div className="pt-4 space-y-2">
                    <div>
                        <div className="flex justify-between">
                            <span>Total</span>
                            <span className="font-semibold">₦{total}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-3 h-3 mt-1 fill-current text-violet-400">
                                <path d="M485.887,263.261,248,25.373A31.791,31.791,0,0,0,225.373,16H64A48.055,48.055,0,0,0,16,64V225.078A32.115,32.115,0,0,0,26.091,248.4L279.152,486.125a23.815,23.815,0,0,0,16.41,6.51q.447,0,.9-.017a23.828,23.828,0,0,0,16.79-7.734L486.581,296.479A23.941,23.941,0,0,0,485.887,263.261ZM295.171,457.269,48,225.078V64A16.019,16.019,0,0,1,64,48H225.373L457.834,280.462Z"></path>
                                <path d="M148,96a52,52,0,1,0,52,52A52.059,52.059,0,0,0,148,96Zm0,72a20,20,0,1,1,20-20A20.023,20.023,0,0,1,148,168Z"></path>
                            </svg>
                            <span className="text-gray-400">Spend ₦200,000.00, get 10% off</span>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span>₦0.00</span>
                    </div>
                </div>
                <div className="pt-4 space-y-2">
                    <div className="flex justify-between ">
                        <span><b>Customer Details:</b></span>
                        <span> </span>
                    </div>
                    <div className="flex flex-col space-y-1 pb-5">
                        <div className="flex justify-between">
                            <span>{userDetails.name&&userDetails.name}</span>
                            <span> </span>
                        </div>
                        <div className="flex justify-between">
                            <span>{userDetails.email&&userDetails.email}</span>
                            <span></span>
                        </div>
                        <div className="flex justify-between">
                            <span>{userDetails.phone&&userDetails.phone}</span>
                            <span></span>
                        </div>
                        <div className="flex flex-col justify-between">
                            <b><span >{userDetails.delivery? 'Deliver to:': 'Pickup at:'}</span></b>
                            <span>{userDetails.delivery? userDetails.address1 : '18, Fashola Street, Diamond Estate Command, Lagos, Nigeria'}</span>
                        </div>
                        
                        <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-primary">How do our fees work?</a>
                    </div>

                    <div className="space-y-6">
                        <div className="flex space-x-5 px-3 justify-between">
                        {<button onClick={()=>setShowModal(false)} type="button" className="w-1/2 md:w-full py-2 font-semibold border rounded bg-gray-100 text-gray-900 border-tertiary hover:bg-gray-200">Back</button>}
                        <button onClick={placeOrder} type="button" className="w-1/2 md:w-full py-2 font-semibold border rounded bg-tertiary text-gray-100 border-gray-100 hover:bg-secondary ">Confirm Order </button>     
                        </div>
                        
                    </div>
                </div>
            </div>
            </div>
    
        </>
    )
}


export default Checkout