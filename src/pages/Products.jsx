import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';

import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { API_URL } from '../App';



const Products = () => {

  const [products, setProducts]= useState(null)
  const [error, setError]= useState(null)

  
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
    <div>
        
        
        <div className='flex items-center flex-col justify-center'>
          <h1 className='pt-8 pb-1 text-2xl text-tertiary'>Popular Items</h1>
           <div className='grid grid-cols-1 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-5'> 
             {products ? (
              products.map((item)=>(
              <div className=''>
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
    </div>
  )
}

export default Products