import React,{useState, useContext} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import {Link} from 'react-router-dom'
import { AuthContext } from '../ContextStore';

const Navbar = () => {
    //manage navbar visibility
    const [nav, setNav] = useState(false);

     
    const {currentUser, logout} = useContext(AuthContext)

    //toggle function to handle navbar display
    const handleNav = () =>{
        setNav(!nav);
    }  

   

  return (  <>      
    <div className='max-w-screen-2xl bg-[#171717] bg-tertiary flex justify-between items-center h-8 max-w-[1240px] mx-auto px-4 text-[#e5e5e5]'>
            {/*Logo*/}
       <Link to='/'> <h1 className='w-full text-lg font-mono font-thin '> GDVSTA </h1></Link>
        <ul className='hidden md:flex' /*style={{"border": "2px solid red"}} */>
        {currentUser? (
            <>
            <li className={`p-4 text-sm  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal`}> Welcome, {currentUser.email}</li>
            <li className = {`p-4 text-sm  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal`} onClick={logout}> Logout </li>
            </>
        ):
        (
        <>
            <li className={`p-4 text-sm  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal`}><Link to ='/About'>About Us</Link></li>
            <li className={`p-4 text-sm  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal`}><Link to ='/adminlogin'>Login</Link></li>
            <li className={`p-4 text-sm  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal`}><Link to ='/adminregister'>Sign Up</Link></li>
            
        </>
        )} {/*}

        <Link ><li className='p-4 text-sm  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal'></li></Link>

            {navItems.map(item=>(
                <Link to={`${item.link}`}><li key={item.id} 
                className={`p-4 text-sm  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-primary font-normal`}>
                    {item.text}
                </li> </Link>
            ))*/}   

        </ul>

        {/* mobile nav icon*/}
        <div onClick={handleNav} className='block md:hidden cursor-pointer'>
            {nav? <AiOutlineClose size={20}/>:<AiOutlineMenu size={20} />}
        </div>
        
        {/*mobile nav menu*/}
        <ul
            className={
                nav
                ? 'fixed md:hidden left-0 top-0 w-[40%] h-60 z-10 border-r-gray-900 bg-[#171717] bg-tertiary ease-in-out duration-500'
                : 'ease-in-out w-[40%] duration-500 fixed top-0 bottom-0 left-[-100%]'
            }>
                <h1 className='w-full text-sm font-thin text-gray-200 m-4 '>GDVSTA</h1>

                {currentUser? (
                    <>
                      <li className={`p-2 text-xs border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`}> Welcome, {currentUser.email}</li>
                      <li className = {`p-2 text-xs border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`} onClick={logout}> Logout </li>
                    </>
                ):
                (
                    <>
                    <li className={`p-2 text-xs border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`}><Link to ='/'>About Us</Link></li>
                    <li className={`p-2 text-xs border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`}><Link to ='/adminlogin'>Login</Link></li>
                    <li className={`p-2 text-xs border-b  duration-300 hover:text-primary cursor-pointer border-gray-600`}><Link to ='/adminregister'>Sign Up</Link></li>
                    </>
                )}

                {/*navItems.map(item=>(
                   <Link to={`${item.link}`}> <li key={item.id}
                    className='p-2 text-xs border-b  duration-300 hover:text-primary cursor-pointer border-gray-600'
                    >
                        {item.text}
                    </li></Link>
                ))*/}
            </ul>

    </div>
    <div>

    </div> </>
  )
}

export default Navbar