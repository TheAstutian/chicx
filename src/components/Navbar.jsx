import React,{useState, useContext} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import{BsCart4} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import { AuthContext, CartContext } from '../ContextStore';
import Cart from '../pages/Cart';
import { useNavigate } from 'react-router-dom';
import gdvsta from '../GDVSTA.PNG';

const Navbar = () => {
    //manage navbar visibility
    const [nav, setNav] = useState(false);
    const [showCart, setShowCart]= useState(false)
    const navigate = useNavigate()
     
    const {currentUser, logout} = useContext(AuthContext)
    const{cartItems}= useContext(CartContext)
    //toggle function to handle navbar display
    const handleNav = () =>{
        setNav(!nav);
    }  
    const toggleCart=()=>{
        setShowCart(!showCart)
    }

    const logUserOut =()=>{
        logout()
        navigate('/')
    }
   

  return (  <>      
    <div className='scroll-smooth  bg-[#171717] bg-tertiary flex justify-between items-center h-12 mx-auto px-4 text-[#e5e5e5]'>
            {/*Logo*/}
       <Link to='/'> <img className='w-20' src={gdvsta} alt="mockup"/>{/*<h1 className='w-full text-lg font-mono font-thin '>  GDVSTA </h1>*/} </Link>
        <ul className='hidden md:flex' /*style={{"border": "2px solid red"}} */>
       
        {currentUser? (
            <>
            <li className={`p-4 text-sm  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal`}> Welcome,  <Link to ='/userprofile'> {currentUser.email}</Link></li>
            <li className = {`p-4 text-sm  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal`} onClick={()=>logUserOut()}> Logout </li>
            </>
        ):
        (
        <>
            <li className={`p-4 text-sm  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal`}><Link to ='/About'>About Us</Link></li>
            <li className={`p-4 text-sm  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal`}><Link to ='/adminlogin'>Login</Link></li>
            <li className={`p-4 text-sm  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal`}><Link to ='/adminregister'>Sign Up</Link></li>
            
        </>
        )}
         <span  onClick={toggleCart} className=' relative p-4 text-sm  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal'> <BsCart4 size={"1.3em"}/> {cartItems.length>0? (<div className='absolute inline-flex items-center justify-center w-5 h-5 text-xs font-normal text-white bg-secondary border border-white rounded-full top-2 end-1'>{cartItems.length}</div>):""}</span>         

        </ul>

        {/* mobile nav icon*/}
        <div className='md:hidden flex flex-row'>
        <span onClick={toggleCart} className=' py-4 text-sm  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal'> <BsCart4 size={20}/> {cartItems.length>0? (<div className='absolute inline-flex items-center justify-center w-5 h-5 text-xs font-normal text-white bg-secondary border border-white rounded-full top-1 end-12'>{cartItems.length}</div>):""}</span>
        <div onClick={handleNav} className='block md:hidden cursor-pointer py-4 m-2'>
            {nav? <AiOutlineClose size={20}/>:<AiOutlineMenu size={20} />}
        </div>
        </div>
        
        {/*mobile nav menu*/}
        
        <ul
            className={
                nav
                ? 'fixed md:hidden left-0 top-0 w-[85%] h-full z-10 border-r-gray-900 bg-[#171717] bg-tertiary ease-in-out duration-500'
                : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
            }>
                <h1 className='w-full text-lg font-semibold text-gray-200 m-4 '>GDVSTA</h1>
                
                
                {currentUser? (
                    <>
                      <li className={`p-2 text-lg border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`} onClick={handleNav}> Welcome, <Link to ='/userprofile'> {currentUser.email}</Link></li>
                      <li className = {`p-2 text-xs border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`} onClick={()=>logUserOut()}> Logout </li>
                    </>
                ):
                (
                    <>
                    <li className={`p-2 text-lg border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`}><Link to ='/About'>About Us</Link></li>
                    <li className={`p-2 text-lg border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`}><Link to ='/adminlogin'>Login</Link></li>
                    <li className={`p-2 text-lg border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`}><Link to ='/adminregister'>Sign Up</Link></li>
                    </>
                )}

               
            </ul>
           

    </div>
    <Cart showModal={showCart} toggle={toggleCart} />
    </>
  )
}

export default Navbar