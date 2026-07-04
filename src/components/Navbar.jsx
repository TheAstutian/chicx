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
   
    const TopBar = () =>{
        return (
            <section className=' font-Elm-sans w-full bg-white '>
                <div className='scroll-smooth flex justify-between items-center h-18 px-4 text-black md:mx-auto md:max-w-[1440px]'>
                            {/*Logo*/}
                    <Link to='/'> <img className='w-24' src={gdvsta} alt="mockup"/>{/*<h1 className='w-full text-lg font-mono font-thin '>  GDVSTA </h1>*/} </Link>

                    {/*Add search bar here */}


                    
                        <ul className='hidden md:flex' /*style={{"border": "2px solid red"}} */>
                    
                        {currentUser? (
                            <>
                            <li className={`p-4 text-md  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 text-black hover:text-primary `}>  <Link to ='/userprofile'> {currentUser.email}</Link></li>
                            <li className = {`p-4 text-md hover:rounded-full rounded-l m-2 cursor-pointer duration-300 text-black hover:text-primary `} onClick={()=>logUserOut()}> LOGOUT </li>
                            </>
                        ):
                        (
                        <>
                            <li className={`p-4 text-md  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal`}><Link to ='/About'>ABOUT</Link></li>
                            <li className={`p-4 text-md  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal`}><Link to ='/adminlogin'>LOGIN</Link></li>
                            <li className={`p-4 text-md  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal`}><Link to ='/adminregister'>SIGN UP</Link></li>
                            
                        </>
                        )}
                        <span  onClick={toggleCart} className=' relative p-4 text-sm text-primary hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal'> <BsCart4 size={"1.5em"}/> {cartItems.length>0? (<div className='absolute inline-flex items-center justify-center w-5 h-5 text-xs font-normal text-white bg-extra border rounded-full top-2 end-1'>{cartItems.length}</div>):""}</span>         

                        </ul>

                        {/* mobile nav icon*/}
                        <div className='md:hidden flex flex-row '>
                        <span onClick={toggleCart} className=' py-4 text-sm  z-40 hover:rounded-full rounded-l m-2 cursor-pointer duration-300 text-black font-normal z-30'> <BsCart4 size={20}/> {cartItems.length>0? (<div className='absolute inline-flex items-center justify-center w-5 h-5 text-xs font-normal text-white bg-extra  rounded-full top-1 end-12'>{cartItems.length}</div>):""}</span>
                        <div onClick={handleNav} className='block md:hidden cursor-pointer py-4 m-2 z-40'>
                            {nav? <AiOutlineClose className=' font-light' size={20}/>:<AiOutlineMenu size={20} className='text-black'/>}
                        </div>
                        </div>
                        
                        {/*mobile nav menu starts here*/}
                        
                        <ul
                            onClick={handleNav}
                            className={
                                
                                nav
                                ? 'fixed md:hidden text-gray-200 font-semibold left-0 top-0 w-[100%] h-full z-30 border-r-gray-900 ease-in-out duration-500 bg-gradient-to-br from-[#024c4c] via-[#078080] to-[#dff6f5]'
                                : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%] '
                            }>
                                {/*<h1 className='w-full text-lg font-semibold text-gray-200 m-4 '></h1>*/}
                                <img className='w-[96px]' src={gdvsta} />
                                
                                
                                {currentUser? (
                                    <>
                                    <li className={`p-2 text-sm border-b  duration-300 hover:text-primary cursor-pointer border-gray-500`} onClick={handleNav}> Welcome, <Link to ='/userprofile'> {currentUser.email}</Link></li>
                                     <li className={`p-2 text-sm border-b  duration-300 hover:text-primary cursor-pointer border-gray-500`}><Link to ='/products' state={{activeCategory: 'Babies & Kids'}}>KIDS & BABIES</Link></li>
                                     <li className={`p-2 text-sm border-b  duration-300 hover:text-primary cursor-pointer border-gray-500`}><Link to ='/products' state={{activeCategory: 'Kitchen Utensils'}}>KITCHEN UTENSILS</Link></li>
                                     <li className={`p-2 text-sm border-b  duration-300 hover:text-primary cursor-pointer border-gray-500`}><Link to ='/products' state={{activeCategory: 'Gifts & Souvenirs'}}>GIFTS</Link></li>
                                     <li className={`p-2 text-sm border-b  duration-300 hover:text-primary cursor-pointer border-gray-500`}><Link to ='/products' state={{activeCategory: 'Home Essentials'}}>HOME ESSENTIALS</Link></li>
                                     <li className={`p-2 text-sm border-b  duration-300 hover:text-primary cursor-pointer border-gray-500`}><Link to ='/products' state={{activeCategory: 'Decors'}}>DECOR</Link></li>
                                     <li className={`p-2 text-sm border-b  duration-300 hover:text-primary cursor-pointer border-gray-500`}><Link to ='/products' state={{activeCategory: 'Exercise & Fitness Supplies'}}>EXERCISE & FITNESS</Link></li>
                                    <li className = {`p-2 text-xs border-b  duration-300 hover:text-primary cursor-pointer border-gray-500`} onClick={()=>logUserOut()}> Logout </li>
                                    </>
                                ):
                                (
                                    <>

                                    <li className={`p-2 text-sm border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`}><Link to ='/adminlogin'>Login</Link></li>
                                    <li className={`p-2 text-sm border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`}><Link to ='/adminregister'>Sign Up</Link></li>
                                     <li className={`p-2 text-sm border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`}><Link to ='/products' state={{activeCategory: 'Babies & Kids'}}>KIDS & BABIES</Link></li>
                                     <li className={`p-2 text-sm border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`}><Link to ='/products' state={{activeCategory: 'Kitchen Utensils'}}>KITCHEN UTENSILS</Link></li>
                                     <li className={`p-2 text-sm border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`}><Link to ='/products' state={{activeCategory: 'Gifts & Souvenirs'}}>GIFTS</Link></li>
                                     <li className={`p-2 text-sm border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`}><Link to ='/products' state={{activeCategory: 'Home Essentials'}}>HOME ESSENTIALS</Link></li>
                                     <li className={`p-2 text-sm border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`}><Link to ='/products' state={{activeCategory: 'Decors'}}>DECOR</Link></li>
                                     <li className={`p-2 text-sm border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`}><Link to ='/products' state={{activeCategory: 'Exercise & Fitness Supplies'}}>EXERCISE & FITNESS</Link></li>
                                     <li className={`p-2 text-sm border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`}><Link to ='/About'>About Us</Link></li>
                                    </>
                                )}

                            
                            </ul>
                        

                    </div>
                    <Cart showModal={showCart} toggle={toggleCart} />
            </section>
        )
    }

    const BottomBar = () =>{
        return (
            <>
            <section className=' font-Elm-sans  hidden md:block md:w-full bg-white'>
                <div className=' text-black mx-auto max-w-[1440px]'>
                    <ul className='grid grid-cols-6 grid-flow-col text-center text-md '>
                        <Link to ='/products' state={{activeCategory: 'Babies & Kids'}}><li className='  py-2 hover:bg-slate-200 hover:cursor-pointer'>KIDS & BABIES</li></Link>
                        <Link to ='/products' state={{activeCategory: 'Kitchen Utensils & Home Essentials'}}><li className='hover:bg-slate-200 hover:cursor-pointer py-2 '> KITCHEN UTENSILS</li></Link>
                        <Link to ='/products' state={{activeCategory: 'Gifts & Souvenirs'}}><li className='hover:bg-slate-200 hover:cursor-pointer py-2 '>GIFTS</li></Link>
                        <Link to ='/products' state={{activeCategory: 'Kitchen Utensils & Home Essentials'}}><li className='hover:bg-slate-200 hover:cursor-pointer py-2 '>HOME ESSENTIALS</li></Link>
                        <Link to ='/products' state={{activeCategory: 'Decors'}}><li className='hover:bg-slate-200 hover:cursor-pointer py-2 '>DECOR</li></Link>
                        <Link to ='/products' state={{activeCategory: 'Exercise & Fitness Supplies'}}><li className='hover:bg-slate-200 hover:cursor-pointer py-2 '>EXERCISE & FITNESS</li></Link>
                    </ul>
                </div>
            </section>
            
            </>
        )
    }
  return (  
        <>      
            < TopBar />
            <BottomBar />
        </>
  )
}

export default Navbar