import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import {FaRegUser} from 'react-icons/fa';
import moment from 'moment';

import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { API_URL } from '../App';
import { AuthContext } from '../ContextStore';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


 
const Products = () => {

  const [products, setProducts]= useState(null)
  const [error, setError]= useState(null)

  const [store,setStore]= useState(null)

  const {currentUser} = useContext(AuthContext)
  
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
      loadProducts();
      loadStore();
      return
    }, [])

    const loadStore = async () =>{
      try{

        const fetchStore = await axios.get(`${API_URL}/store`)
        if(fetchStore){          
          const sortedStore = fetchStore.data.sort(function compare(a,b){
            var dateA = new Date (a.date);
            var dateB = new Date (b.date);
            return dateB - dateA
          })


          setStore(sortedStore)
          
        }

      }catch(err){
        console.log(err)
      }
    }
    



  return (
    <div>
        { currentUser&& 
        <div className='flex items-right justify-right bg-white py-2.5 pt-4 px-5 pl-8'> 
        
          <FaRegUser className='m-2 text-tertiary'/>  <p className='mr-5 p-1 text-tertiary '>  {currentUser.email}</p>
        <Link 
             to='/NewProduct' 
              title="" 
              className="mx-1 px-3 py-2 text-sm font-medium text-white focus:outline-none bg-tertiary rounded-lg border border-gray-200 hover:bg-white hover:border-tertiary hover:text-tertiary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              role="button" 
            > 
               Add New Item
      </Link>
          </div>}
          <div className=''>
          <h1 className='pt-8 pb-1 ml-10 text-2xl text-tertiary'>Awa Market</h1>
          <hr className=' h-px my-2 bg-gray-400 border-0'/>
          
            {store? <>
              
                {store.map((item)=>(<>
                  <div className='p-2 pl-20 pt-5 m-2 mb-5 h-24 flex flex-row'> 
                    <Link to={`/products/${item._id}`}><img className='h-20 hover:opacity-70' src={item.imageUrl} /></Link>
                    <div className='ml-5'>
                    <Link to={`/products/${item._id}`}>  <h1 className='text-black text-lg'>{item.name}</h1></Link>
                        <p className='text-black text-sm'>Price: <span className='text-gray-500'>₦{item.price}</span></p>
                        <p className='text-black text-sm'>Added: <span className='text-gray-500'>{moment(item.date).fromNow()}</span> </p>
                    </div> 
                                      
                  </div>
                   <hr className=' h-px bg-gray-400 border-0'/></>
                ))}</>:
                <div className='grid place-items-center py-20 my-10'>
               <AiOutlineLoading3Quarters className="loading-icon"/>
              </div>
              } 
          </div> {/*
        <div className='flex items-center flex-col justify-center'>
          <h1 className='pt-8 pb-1 text-2xl text-tertiary'>All Items</h1>
           <div className='grid grid-cols-1 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-5'> 
             {products ? (
              products.map((item)=>(
              <div className=''>
              
              <Card 
                key={item.id}
                data={item} />
              </div>
             ))
             ) : (
             <div >
               <AiOutlineLoading3Quarters className="loading-icon"/>
              </div>
             )} 
             
            </div>
            </div>*/}
    </div>
  )
}

export default Products