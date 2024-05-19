import React,{useState} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import {Link} from 'react-router-dom'

const Navbar = () => {
    //manage navbar visibility
    const [nav, setNav] = useState(false);

    //toggle function to handle navbar display
    const handleNav = () =>{
        setNav(!nav);
    }

    //nav links
    const navItems = [
        {id: 1, text: 'Home', link:'/'},
        {id:2, text: 'About', link:'/about'},
        {id:3, text: 'Contact', link:'/contact'},
        
    ]
    const mainCo = '[#f79489';
    const mainCol = '#00FF00';
    const hsl = "hsl(6,87.3%,75.3%)"

  return (
    <div className='w-full bg-[#171717] flex justify-between items-center h-8 max-w-[1240px] mx-auto px-4 text-[#e5e5e5]'>
            {/*Logo*/}
       <Link to='/'> <h1 className=' text-lg font-mono font-thin '> GDVSTA </h1></Link>
        <ul className='hidden md:flex' /*style={{"border": "2px solid red"}} */>
            {navItems.map(item=>(
                <Link to={`${item.link}`}><li key={item.id} 
                className={`p-4 text-sm  hover:rounded-full rounded-l m-2 cursor-pointer duration-300 hover:text-[#f79489] font-normal`}>
                    {item.text}
                </li> </Link>
            ))}

        </ul>

        {/* mobile nav icon*/}
        <div onClick={handleNav} className='block md:hidden cursor-pointer'>
            {nav? <AiOutlineClose size={20}/>:<AiOutlineMenu size={20} />}
        </div>
        
        {/*mobile nav menu*/}
        <ul
            className={
                nav
                ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r-gray-900 bg-[#171717] ease-in-out duration-500'
                : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
            }>
                <h1 className='w-full text-sm font-thin text-gray-200 m-4 '>GDVSTA</h1>
                {navItems.map(item=>(
                   <Link to={`${item.link}`}> <li key={item.id}
                    className='p-2 text-xs border-b  duration-300 hover:text-primary cursor-pointer border-gray-600'
                    >
                        {item.text}
                    </li></Link>
                ))}
            </ul>

    </div>
  )
}

export default Navbar