import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';

import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { API_URL } from '../App';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import ReactGA from 'react-ga4';



const Home = () => {

  ReactGA.send({
    hitType: "pageview",
    page:"/",
    title:"Home",
  })
const [popular, setPopular] = useState(null)
const [deals, setDeals] = useState(null)
const [error, setError]= useState('')

useEffect (()=>{ 
  loadProducts() 
  return
}, [])

const loadProducts = async()=>{
    
  try{
    const fetchProducts = await axios.get(`${API_URL}/products`)
    if(fetchProducts){ 
      
      setPopular(fetchProducts.data) 
    }

    const fetchDeals = await axios.get(`${API_URL}/deals`)
    if(fetchDeals){
      setDeals(fetchDeals.data)
    } 
    
  } catch(err){
    console.log(err)
  }
}

  return (
    <div className='bg-[#e5e5e5] '>
        <Hero/>

        <div className='flex items-center md:py-5 flex-col justify-center' >
            <h1 className='pt-10  text-2xl text-tertiary'> Latest Deals</h1>
                <div  className=' carousel w-2/3 rounded-box ' > 

                {deals? (deals.map((item)=>(
                  <div className='carousel-item m-1'>
                     <Card 
                      key={item._id}
                      data={item} />
                
                    </div>
                ))):(
                   <div className=' w-full items-center justify-center py-10 my-10 h-40'>
                     <AiOutlineLoading3Quarters className="loading-icon mx-auto"/>
                     </div> 
             )}
                </div>
                
        </div>
        
        <div className='flex items-center flex-col justify-center'>
          <h1 className='pt-8 pb-1 text-2xl text-tertiary'> Popular </h1>
           
             {popular ? (
              <div className='grid grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 lg:gap-5'> 
              {popular.map((item)=>(
              <div className="">
             
              <Card 
                key={item._id}
                data={item} />
              </div>
             ))}
             </div> 
             ) 
             : 
             (
             <div className='py-10 my-10 w-full'>
               <AiOutlineLoading3Quarters className="w-full loading-icon"/>
             </div>
             )} 
            
        </div>
        <div className='  flex justify-center p-10' >
          <button className='px-5 py-3  font-thin text-white rounded-lg bg-secondary hover:bg-tertiary hover:text-white  focus:ring-4 focus:ring-primary '><Link to ='/products'> Show More</Link></button>
        </div>
       
        <Testimonials />
    </div>
  )
}

export default Home