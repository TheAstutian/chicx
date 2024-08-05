import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className='bg-white dark:bg-gray-900'>
        <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'> 
        <div className='mr-auto place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 text-4xl text-secondary font-medium tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white'>Goldyvhista Hubz</h1>
            <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>Your Premium Destination for Quality Kitchen Utensils, Kiddies Essentials, Household Supplies, Souvenirs, and so much more! </p>
            <Link to='/products' className='inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-thin text-center text-white rounded-lg bg-secondary hover:bg-tertiary hover:text-white  focus:ring-4 focus:ring-primary dark:focus:ring-primary'>
               Start Shopping
                <svg className='w-5 h-5 ml-2 -mr-1' fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </Link>
        </div>
        <div className='hidden lg:mt-0 lg:col-span-5 lg:flex'>
            <img src="https://vepaar.b-cdn.net/uploads/c-203301/store-banner/16194886/media_1712084361909698772.png" alt="mockup"/>
        </div>

        </div>
    </section>
  )
}

export default Hero