import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';

import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { API_URL } from '../App';



  
const item_sample = {
  id: 1,
  name: 'Samsung Galaxy S21',
  description: 'Latest model with advanced features',
  price: 450000.00,
  primaryCategory: 'Electronics',
  secondaryCategory: 'Mobile Phones',
  imageUrl: 'https://example.com/images/samsung-galaxy-s21.jpg',
  details: 'The Samsung Galaxy S21 offers a new camera design, a faster processor, and better software features.',
  date: '2024-02-15',
}




const Home = () => {

const [products, setProducts] = useState(null)
const [error, setError]= useState('')


useEffect (()=>{ 
  const loadProducts = async()=>{
    
    try{
      const fetchProducts = await axios.get(`${API_URL}/products`)
      if(fetchProducts){ 
        
        setProducts(fetchProducts.data) 
      }
    } catch(err){
      console.log(err)
    }
  }
  loadProducts() 
  return
}, [])

  return (
    <div className='bg-[#e5e5e5]'>
        <Hero/>

        <div className='flex items-center flex-col justify-center' >
            <h1 className='pt-10  text-2xl text-tertiary'>Latest Deals</h1>
                <div  className=' carousel w-2/3 rounded-box ' > 
                  <div className='carousel-item '>
                  <Card id={item_sample.id} data={item_sample} />
                  </div>

                  <div className='carousel-item'>
                  <Card id={item_sample.id} data={item_sample} />
                  </div>

                  <div className='carousel-item'>
                  <Card id={item_sample.id} data={item_sample}/>
                  </div>

                  <div className='carousel-item'>
                  <Card id={item_sample.id} data={item_sample}/>
                  </div>

                  <div className='carousel-item'>
                  <Card id={item_sample.id} data={item_sample}/>
                  </div>

                </div>
        </div>
        
        <div className='flex items-center flex-col justify-center'>
          <h1 className='pt-8 pb-1 text-2xl text-tertiary'>Popular Items</h1>
           <div className='grid grid-cols-1 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-5'> 
             {products ? (
              products.map((item)=>(
              <div className="">
              <Link to={`/products/${item.id}`}  > 
              <Card 
                id={item.id}
                data={item} /></Link>
              </div>
             ))
             ) : (
              <p>Loading...</p>
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