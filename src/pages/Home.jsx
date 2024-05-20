import React from 'react'

import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials'

const db =[

]

const Home = () => {


  return (
    <div className='bg-[#e5e5e5]'>
        <Hero/>
        <h1 className='p-4 ml-10 text-2xl text-color-primary'>Latest deals</h1>
        <Testimonials />
    </div>
  )
}

export default Home