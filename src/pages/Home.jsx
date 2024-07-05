import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';

import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { API_URL } from '../App';
import { AiOutlineLoading3Quarters } from "react-icons/ai";



  
const item_sample = {
  id: 419,
  name: 'Samsung Galaxy S21',
  description: 'Latest model with advanced features',
  price: 450000.00,
  primaryCategory: 'Electronics',
  secondaryCategory: 'Mobile Phones',
  imageUrl: 'https://images1.vinted.net/t/02_0189c_fFYTzsgdgRx1akoFu6AHd79P/f800/1718562268.jpeg?s=ee42e00896d42cfe454beef9988b16a41085979a',
  details: 'The Samsung Galaxy S21 offers a new camera design, a faster processor, and better software features.',
  date: '2024-02-15',
}




const Home = () => {

const [products, setProducts] = useState(null)
const [deals, setDeals] = useState(null)
const [error, setError]= useState('')


useEffect (()=>{ 
  const loadProducts = async()=>{
    
    try{
      const fetchProducts = await axios.get(`${API_URL}/products`)
      if(fetchProducts){ 
        
        setProducts(fetchProducts.data) 
      }

      const fetchDeals = await axios.get(`${API_URL}/deals`)
      if(fetchDeals){
        setDeals(fetchDeals.data)
      }console.log('works') 
      console.log(deals)
    } catch(err){
      console.log(err)
    }
  }
  loadProducts() 
  return
}, [])

  return (
    <div className='bg-[#e5e5e5] '>
        <Hero/>

        <div className='flex items-center flex-col justify-center' >
            <h1 className='pt-10  text-2xl text-tertiary'>Latest Deals</h1>
                <div  className=' carousel w-2/3 rounded-box ' > 

                {deals? (deals.map((item)=>(
                  <div className='carousel-item'>
                     <Card 
                      key={item._id}
                      data={item} />
                    </div>
                ))):(
                 
                    <AiOutlineLoading3Quarters className="loading-icon"/>
                  
             )}
                </div>
        </div>
        
        <div className='flex items-center flex-col justify-center'>
          <h1 className='pt-8 pb-1 text-2xl text-tertiary'>Popular Items</h1>
           <div className='grid grid-cols-1 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-5'> 
             {products ? (
              products.map((item)=>(
              <div className="">
             
              <Card 
                key={item._id}
                data={item} />
              </div>
             ))
             ) : (
             <div className='pt-10 mt-10 mb-10 pb-10'>
               <AiOutlineLoading3Quarters className="loading-icon"/>
             </div>
             )} 
             
            </div>
            
        </div>
        <div className='  flex justify-end pt-3 pr-20 pb-10' >
          <button className='px-5 py-3  font-thin text-white rounded-lg bg-secondary hover:bg-tertiary hover:text-white  focus:ring-4 focus:ring-primary '><Link to ='/products'>See all di market</Link></button>
        </div>
       
        <Testimonials />
    </div>
  )
}

export default Home