import React from 'react';
import { Link } from 'react-router-dom';
import gdvsta from '../GDVSTA.PNG';

const Footer = () => {
    return (
        <footer className="p-4 bg-[#eee] md:p-8 lg:p-10 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl text-center">
                <a href="#" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
                   <img className='w-20' src={gdvsta} alt="mockup"/> 
                    GoldyVhista Hubz
                </a>
                <p className="my-6 text-[#171717] dark:text-gray-400">Diamond Estate, Command Ipaja, Lagos, Nigeria</p>
                <ul className="flex flex-wrap justify-center items-center mb-6  text-gray-900 dark:text-white">
                    <li>
                        <Link to='/About' className="mr-4 hover:underline md:mr-6 ">About Goldyvhista Hubz</Link>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">How it works</a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/profile.php?id=61556588190910" className="mr-4 hover:underline md:mr-6 ">Facebook</a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/goldyvhista_hubz/" className="mr-4 hover:underline md:mr-6">Instagram</a>
                    </li>
                   
                </ul>
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">The Astutian™</a>. All Rights Reserved.</span>
            </div>
    </footer>
  )
}

export default Footer