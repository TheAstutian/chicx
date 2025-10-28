import React, {useState, useEffect, useRef, useContext} from 'react'
import axios from 'axios';
import {FaRegUser} from 'react-icons/fa';
import { IoIosArrowForward, IoIosArrowBack, IoIosArrowDown} from "react-icons/io";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import moment from 'moment';

import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { API_URL } from '../App';
import { AuthContext } from '../ContextStore';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import ReactGA from 'react-ga4'
 
export const capitalizeTitle = (string) =>{
  return string.split(' ').map(word=>{
    if(word.charAt(0) === word.charAt(0).toUpperCase && word.charAt(1) === word.charAt(1).toUpperCase ){
      return word
    } else return word.charAt(0).toUpperCase()+ word.slice(1)
  }).join(' ')
 }
 
const Products = () => {

  ReactGA.send({
    hitType:"pageview",
    page:"/products",
    title:"Store"
  })
  const {currentUser} = useContext(AuthContext)
  const currentUserRef = useRef(currentUser)
  const [error, setError]= useState(null)

  const [store,setStore]= useState(null)
  const [currentStore, setCurrentStore] = useState(null); 
  const [displayCategory, setDisplayCategory]= useState('');
  const[activateSearch, setActivateSearch]= useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20)
  useEffect (()=>{ 

      loadProducts(); 
      
      window.scrollTo(0,0)
      return
    }, [currentPage, displayCategory, activateSearch])

    const loadProducts = async()=>{
        
      try{
        
        const fetchStore = await axios.get(`${API_URL}/store?page=${currentPage}&searchquery=${searchQuery}&category=${displayCategory}`)
        if(fetchStore){ 
          
          const TotalPages = Math.ceil(fetchStore.data[0].totalCount[0].count/rowsPerPage)
         console.log(searchQuery)
          setTotalPages(TotalPages)
          setCurrentStore(fetchStore.data[0].totalData)
        }
      } catch(err){
        console.log(err)
      }
    }

    const changeCategory = (category)=>{
    setDisplayCategory(category)
    setCurrentPage(1)
    }

    const handleKeyPress = (event)=>{
      
      if(event.key==='Enter'){
        onSearch(event)
      }
    }
     const onSearch = async (e)=>{
        e.preventDefault()
        console.log(searchQuery)
        setActivateSearch(!activateSearch)
        
     }
    

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
    <div className=' bg-[#e5e5e5] scroll-smooth' >
      {/*ADMIN SECTION*/}
        { currentUser? ( currentUser.type==='admin'?(
        <div className='flex items-right justify-right bg-white py-2.5 pt-4 px-5 pl-8'> 
        
          <FaRegUser className='m-2 text-tertiary'/>  <p className='mr-5 p-1 text-tertiary '>  {currentUser.email}</p>
        <Link 
             to='/NewProduct' 
              title="" 
              className="mx-1 px-3 py-2 text-sm font-medium text-white focus:outline-none bg-tertiary rounded-lg border border-gray-200 hover:bg-white hover:border-tertiary hover:text-tertiary focus:z-10 focus:ring-4 focus:ring-gray-100 "
              role="button" 
            > 
               Add New Item
      </Link>
          </div>):('')):('')}

          {/*HEADING AND CONTENT SECTION*/}
          <div className='w-full flex flex-col'>
          
          <h1 className='pt-8 pb-1 ml-10 text-2xl text-tertiary'>Start Shopping {displayCategory? `: ${displayCategory}` :('') }</h1>

          <div className='grid grid-cols-5'>


          

          <div className='flex flex-col col-span-5 md:col-span-1 md:pt-3'>

          <div className='mx-5 md:col-span-1 md:ml-3 mt-1 py-2 flex flex-row h-12 md:mr-10 md:pr-10 relative'>
            <input
                  type="search" 
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent  outline outline-1 outline-tertiary transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                  placeholder="Search"
                  onChange={(e)=>{setSearchQuery(e.target.value)}}
                  onKeyDown={(e)=>{handleKeyPress(e)}}
                   />     
              <label
                  htmlFor="exampleFormControlInput"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.47rem] pl-1 leading-[1.8] text-neutral-500 italic transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                  >Search
                </label>
                <button onClick={onSearch}
                  className="relative z-[2] -ms-0.5 flex items-center rounded-e bg-tertiary px-3  text-xs font-medium uppercase leading-normal text-gray shadow-tertiary transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  type="button"> 
                  <span className="[&>svg]:h-5 [&>svg]:w-5 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </span>
                </button>

            </div>

              <div className='mx-5 dropdown md:hidden md:px-3 py-2 flex flex-row md:pl-10 md:ml-10'>
                  
                <div tabIndex={0} role="button" className='btn btn-sm btn-outline bg-gray hover:bg-tertiary text-tertiary hover:text-white m-1'>Shop by category <IoIosArrowDown /> </div>
                <ul tabIndex={0} className='dropdown-content menu bg-tertiary rounded-box z-[1] w-52 p-2 ml-1 shadow'>
                  <li onClick={()=>{changeCategory('') }} className='text-zinc'><span>All Categories</span></li>
                  <li onClick={()=>changeCategory('Babies & Kids')} className='text-white'><span>Babies & Kids</span></li>
                  <li onClick={()=>changeCategory('Kitchen Utensils & Home Essentials')} className='text-white'><span> Kitchen Utensils & Home Essentials</span></li>
                  <li onClick={()=>changeCategory('Gifts & Souvenirs')}className='text-white'><span> Gifts & Souvenirs</span></li>
                  <li onClick={()=>changeCategory('Decors ')}className='text-white'><span> Decors</span></li>
                  <li onClick={()=>changeCategory('Exercise & Fitness Supplies')} className='text-white'><span> Exercise & Fitness Supplies </span></li>
                  <li onClick={()=>changeCategory('Resin Materials & Tools')}className='text-white'><span> Resin Materials & Tools</span></li>
                </ul>


              </div>
            <div className='hidden md:block mt-1 p-2'>
            <ul tabIndex={0} className='dropdown-content menu  z-[1] p-2 ml-1 '>
                  <li onClick={()=>{changeCategory('') }} className='text-zinc'><span>All Categories</span></li>
                  <li onClick={()=>changeCategory('Babies & Kids')} className='text-gray-500'><span>Babies & Kids</span></li>
                  <li onClick={()=>changeCategory('Kitchen Utensils & Home Essentials')} className='text-gray-500'><span> Kitchen Utensils & Home Essentials</span></li>
                  <li onClick={()=>changeCategory('Gifts & Souvenirs')}className='text-gray-500'><span> Gifts & Souvenirs</span></li>
                  <li onClick={()=>changeCategory('Decors ')}className='text-gray-500'><span> Decors</span></li>
                  <li onClick={()=>changeCategory('Exercise & Fitness Supplies')} className='text-gray-500'><span> Exercise & Fitness Supplies </span></li>
                  <li onClick={()=>changeCategory('Resin Materials & Tools')}className='text-gray-500'><span> Resin Materials & Tools</span></li>
                </ul>
              </div>  
            
          </div>
          
          <hr key="2" className=' col-span-5 h-px mt-2 bg-gray-400 border-0 md:hidden'/>
          
            {currentStore? <div className='col-span-5 md:col-span-4 md:flex md:flex-row md:flex-wrap'>
              
                {currentStore.map((item)=>(<>

                
                  <div   key={`${item._id}`} className='flex flex-row p-2  pl-1 pt-5 m-2 md:my-3 md:p-1 md:flex-col md:border md:border-gray-300 md:w-56 md:h-68 md:rounded-sm'> 
                 
                   <div className=' flex-none w-32 md:w-full  '> 
                         <Link to={`/products/${item._id}`} className='relative'><img className='h-32 md:h-full md:w-full p-1 rounded-lg m-auto hover:opacity-70' src={item.imageUrl} />
                         <span className="absolute top-0 left-0 m-2 rounded-full bg-red-600 px-2 text-center text-xs font-normal text-white"> {item.popular? "Popular": ""} </span>
                         {/*<span className="absolute top-5 left-0 m-2 rounded-full bg-red-600 px-2 text-center text-xs font-normal text-white"> {item.deal? "Good deal": ""} </span>*/}
                         </Link>
                    </div>
                    <div className='ml-5  pt-5 flex-1 md:flex-none w-64 md:w-full mr-10  pr-10 md:w-full mr-2 pr-2 md:pt-2 md:mx-2'>
                  
                    <Link to={`/products/${item._id}`}> 
                      <> <span className='text-tertiary font-bold md:font-medium '>₦{Intl.NumberFormat("en-US").format(item.sellingPrice)}     </span><span className='line-through text-xs text-red-500'>{} ₦{item.price}</span></>
                       <p className='text-black mt-2 md:mt-0 md:text-base line-clamp-3 md:line-clamp-3 md:py-1 mx-auto'>{capitalizeTitle(item.name)}</p>
                       </Link>   
                  {/*}  <p className='hidden text-black text-sm'>Discount: <span className='text-tertiary font-bold md:font-medium'> {item.discount>0? "Yes": "No"}</span> </p>
                    <p className=' hidden text-black text-sm'>Added: <span className='text-gray-500'>{moment(item.date).fromNow()}</span> </p>*/}
                    </div> 

                                      
                  </div>
                   <hr className=' col-span-5 h-px bg-gray-400 border-0 md:col-span-0 md:hidden'/></>
                ))}
 
                </div>:
                <div className='grid place-items-center py-20 my-10'>
               <AiOutlineLoading3Quarters className="loading-icon"/>
              </div>
              } 
        </div>
              </div>

{/*PAGINATION HERE */}
                <div className='p-3 my-5 mr-3 relative'>
                <nav className=" absolute bottom-0 right-0 inline-flex items-center p-1 rounded bg-gray space-x-2" >
                  <span onClick={()=> setCurrentPage(1)} className="p-1 rounded border cursor-pointer text-tertiary bg-white hover:text-white hover:bg-tertiary hover:border-black">
                    <RxDoubleArrowLeft/>
                  </span>
                  <span onClick={() => setCurrentPage(currentPage => Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="p-1 rounded border text-tertiary bg-white hover:text-white cursor-pointer hover:bg-tertiary hover:border-white" >
                  <IoIosArrowBack />
                  </span>
                  <span className="text-tertiary">{` Page ${currentPage} of ${totalPages} `}</span>
                  <span onClick={() => setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className="p-1 rounded border cursor-pointer text-tertiary bg-white hover:text-white hover:bg-tertiary hover:border-black">
                  <IoIosArrowForward />
                  </span>
                  <span onClick={()=> setCurrentPage(totalPages)} className="p-1 rounded border cursor-pointer text-tertiary bg-white hover:text-white hover:bg-tertiary hover:border-black">
                  <RxDoubleArrowRight/>
                  </span>
                </nav>
                </div>


          
             
    </div>
    
  )
}

export default Products