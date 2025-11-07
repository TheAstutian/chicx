import React, {useState, useEffect} from 'react';
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

useEffect (()=>{ 
  loadProducts() 
  return
}, [])

const loadProducts = async()=>{
    
  try{
    const fetchProducts = await axios.get(`${API_URL}/products`)
    if(fetchProducts){ 
      
      setPopular(fetchProducts.data.popularProducts) 
      setDeals(fetchProducts.data.latestDeals)
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
                  <div className='carousel-item my-3 mx-0.5 h-full'>
                     <Card className="bg-blue-300"
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
              <div className='grid grid-cols-1 md:grid-cols-3 gap-5 lg:grid-cols-4 lg:gap-5'> 
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

        {/* Experimental, might remove later */}
        <div className='bg-white'>
        <section className="p-6 my-6 dark:bg-gray-100 dark:text-gray-800">
	<div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
		<div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 dark:text-gray-100">
					<polygon points="160 96.039 160 128.039 464 128.039 464 191.384 428.5 304.039 149.932 304.039 109.932 16 16 16 16 48 82.068 48 122.068 336.039 451.968 336.039 496 196.306 496 96.039 160 96.039"></polygon>
					<path d="M176.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,176.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,176.984,464.344Z"></path>
					<path d="M400.984,368.344a64.073,64.073,0,0,0-64,64h0a64,64,0,0,0,128,0h0A64.072,64.072,0,0,0,400.984,368.344Zm0,96a32,32,0,1,1,32-32A32.038,32.038,0,0,1,400.984,464.344Z"></path>
				</svg>
			</div>
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">200+</p>
				<p className="capitalize">Orders</p>
			</div>
		</div>
		<div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 dark:text-gray-100">
					<path d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
					<path d="M256,384A104,104,0,0,0,360,280H152A104,104,0,0,0,256,384Z"></path>
					<polygon points="205.757 228.292 226.243 203.708 168 155.173 109.757 203.708 130.243 228.292 168 196.827 205.757 228.292"></polygon>
					<polygon points="285.757 203.708 306.243 228.292 344 196.827 381.757 228.292 402.243 203.708 344 155.173 285.757 203.708"></polygon>
				</svg>
			</div>
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">1.5K</p>
				<p className="capitalize">Happy customers</p>
			</div>
		</div>
		<div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
					<path d="M462.541,316.3l-64.344-42.1,24.774-45.418A79.124,79.124,0,0,0,432.093,192V120A103.941,103.941,0,0,0,257.484,43.523L279.232,67a71.989,71.989,0,0,1,120.861,53v72a46.809,46.809,0,0,1-5.215,21.452L355.962,284.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421V432h-72v32h104V378.494A74.061,74.061,0,0,0,462.541,316.3Z"></path>
					<path d="M318.541,348.3l-64.343-42.1,24.773-45.418A79.124,79.124,0,0,0,288.093,224V152A104.212,104.212,0,0,0,184.04,47.866C126.723,47.866,80.093,94.581,80.093,152v72a78,78,0,0,0,9.015,36.775l24.908,45.664L50.047,348.3A74.022,74.022,0,0,0,16.5,410.4L16,496H352.093V410.494A74.061,74.061,0,0,0,318.541,348.3ZM320.093,464H48.186l.31-53.506a42.158,42.158,0,0,1,19.073-35.421l88.682-58.029L117.2,245.452A46.838,46.838,0,0,1,112.093,224V152a72,72,0,1,1,144,0v72a46.809,46.809,0,0,1-5.215,21.452L211.962,316.8l89.058,58.274a42.16,42.16,0,0,1,19.073,35.421Z"></path>
				</svg>
        
			</div>
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">25K</p>
				<p className="capitalize">Social Media Followers</p>
			</div>
		</div>
		<div className="flex p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 dark:text-gray-100">
					<path d="M425.706,142.294A240,240,0,0,0,16,312v88H160V368H48V312c0-114.691,93.309-208,208-208s208,93.309,208,208v56H352v32H496V312A238.432,238.432,0,0,0,425.706,142.294Z"></path>
					<rect width="32" height="32" x="80" y="264"></rect>
					<rect width="32" height="32" x="240" y="128"></rect>
					<rect width="32" height="32" x="136" y="168"></rect>
					<rect width="32" height="32" x="400" y="264"></rect>
					<path d="M297.222,335.1l69.2-144.173-28.85-13.848L268.389,321.214A64.141,64.141,0,1,0,297.222,335.1ZM256,416a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,416Z"></path>
				</svg>
			</div>
			<div className="flex flex-col justify-center align-middle">
				<p className="text-3xl font-semibold leading-none">10+</p>
				<p className="capitalize">Years in Service</p>
			</div>
		</div>
	</div>
</section>
        </div>
       
        <Testimonials />
        
    </div>
  )
}

export default Home