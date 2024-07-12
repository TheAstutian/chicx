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

  
  const [error, setError]= useState(null)

  const [store,setStore]= useState(null)
  const [currentStore, setCurrentStore] = useState(null); 

  const {currentUser} = useContext(AuthContext)

  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect (()=>{ 
      const loadProducts = async()=>{
        
        try{
          const fetchStore = await axios.get(`${API_URL}/store`)
          if(fetchStore){ 
            setStore(fetchStore.data)  
          }
        } catch(err){
          console.log(err)
        }
      }
      loadProducts();
      setActiveArray();
      window.scrollTo(0,0)
      return
    }, [])

    const changeStore = (store)=>{
      if(store){
        setCurrentStore(store)
      }
    }

    var totalPages; 
    if(store){ totalPages = Math.ceil(store.length/15)}
    
    const paginate = (array,pageNumber,itemsPerPage) =>{
      const startIndex = (pageNumber-1)*itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      return array.slice(startIndex, endIndex); 
    }

    const  setActiveArray = async ()=>{
      if(store){
        const activeArray = await paginate(store,currentPage,15)
       setCurrentStore(activeArray)
       console.log('it is done')
      }

    }
    //var activeArray = paginate(store,currentPage,10);
   

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
          
            {currentStore? <>
              
                {currentStore.map((item)=>(<>
                  <div style={{"width":"100%"}} className='p-2  pl-1 md:pl-20 pt-5 m-2 mb-10 md:mb-5 h-32 md:h-26 flex flex-row'> 
                   <div className=' flex-none w-32 '> 
                         <Link to={`/products/${item._id}`}><img className='h-28 md:h-24 m-auto hover:opacity-70' src={item.imageUrl} /></Link>
                    </div>
                    <div className='ml-5  flex-1 w-64 mr-10  pr-10'>
                       <Link to={`/products/${item._id}`}>  <p className='text-black text-sm md:text-lg line-clamp-3 md:line-clamp-1 font-bold md:font-medium'>{item.name}</p></Link>
                       <p className='text-black text-sm'>Price: <span className='text-tertiary font-bold md:font-medium'>₦{item.price}</span></p>
                    <p className='text-black text-sm'>Discount: <span className='text-tertiary font-bold md:font-medium'> {item.discount>0? "Yes": "No"}</span> </p>
                    <p className='text-black text-sm'>Added: <span className='text-gray-500'>{moment(item.date).fromNow()}</span> </p>
                    </div> 

                                      
                  </div>
                   <hr className=' h-px bg-gray-400 border-0'/></>
                ))}

                </>:
                <div className='grid place-items-center py-20 my-10'>
               <AiOutlineLoading3Quarters className="loading-icon"/>
              </div>
              } 

                <div className='p-3 my-5 mr-3 relative'>
                <nav className=" absolute bottom-0 right-0 inline-flex items-center p-1 rounded bg-white space-x-2" >
                  <a onClick={() => setCurrentPage(currentPage => Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="p-1 rounded border text-tertiary bg-white hover:text-white cursor-pointer hover:bg-tertiary hover:border-white" >
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                  </svg>
                  </a>
                  <span className="text-tertiary">{` Page ${currentPage} of ${totalPages} `}</span>
                  <a onClick={() => setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className="p-1 rounded border cursor-pointer text-tertiary bg-white hover:text-white hover:bg-tertiary hover:border-black">
                     <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                  </a>
                </nav></div>


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