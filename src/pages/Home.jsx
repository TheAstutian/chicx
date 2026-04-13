import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { API_URL } from '../App';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import newInImage from '../newInimage.jpg'


import ReactGA from 'react-ga4';



const Home = () => {

  ReactGA.send({
    hitType: "pageview",
    page:"/",
    title:"Home",
  })
const [popular, setPopular] = useState(null)
const [deals, setDeals] = useState(sampleDeals)

useEffect (()=>{ 
  loadProducts() 
  return
}, [deals])

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


const HotDeals = () =>{
  return <>
    <div className='flex py-5 mb-5 md:py-10 md:mb-10 flex-col  ' >
            <h1 className='text-center text-2xl md:text-4xl md:font-medium md:mb-10 text-black'> Hot Deals</h1>
                <div  className='md:w-full grid grid-cols-2 md:grid-cols-6 justify-items-center px-5 md:px-20' > 

                {deals? (deals.map((item)=>(
                  <div className=' my-3 mx-0.5 h-full'>
                     <Card className=""
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
  </>
}

const NewIn = ()=>{

  return(
    <>
    <section className='relative min-h-96 md:min-h-[520px]'>
      <div className='absolute flex flex-col justify-center inset-0 bg-no-repeat bg-cover ' style={{ backgroundImage: `url(${newInImage})` }}>

      
      <div className='ml-3 md:ml-20 md:pl-20 flex flex-col items-start ' >
        <h1 className='text-3xl md:text-4xl text-semibold mb-5'>New arrivals</h1>
        <span className='text-md inline-block mb-5'>Shop hundreds of new life-changing products <br className=''/> across cooking, cleaning & laundry.</span>
       <Link to='/products' className=' px-3 py-2 mr-3 font-medium text-center text-white rounded-sm bg-secondary hover:bg-secondary hover:text-white  focus:ring-4 focus:ring-primary '>
                     Shop All New
  
                  </Link>
      </div>
      </div>     
    </section>
    </>
  )
}

const OtherCatContent = () =>{


  return (
    <>
    <section className='bg-yellow-400 flex flex-col justify-center items-center md:pb-20 '>

      <div className='hidden md:flex md:flex-col md:mt-20 md:mb-10 md:pb-10'>
        <h1 className='text-3xl md:text-5xl text-semibold'>Every Shopper's Delight...</h1>
      <span className='text-center pt-3 text-bold'>For a fraction of the price!</span>
      </div>

      <div className='flex flex-col md:flex-row md:space-x-3 md:w-3/5'>
        {
          otherCatContentData.map(topitem => (
            <>
          <div className='flex flex-col items-center pt-5 pb-5 border-b border-slate-200 w-full bg-white'>
            <h3 className='self-start pl-5 text-xl pb-5 font-semibold'>{topitem.name}</h3>
            <div className='grid grid-cols-2 w-4/5 p-4'>
              {topitem.data.map( item =>(
                <>
                <Link to={item.link}>
                <img className="w-50 h-50 p-0 m-0" src={item.img} />
                </Link>
                </>
              )

              )}
            </div>
            <Link className="self-end pr-5 pt-3 hover:font-semibold" to="/products"> <p> More</p></Link>

          </div>
            </>
          ))
        }
          
      </div>
    </section>
    </>
  )
}

const Popular = () =>{
  return (
    <>
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
    </>
  )
}

const Brands = () =>{
  return (
    <>
    <div className='bg-white'>
        <section className="p-6 mb-1">
	<div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
		<div className="flex p-4 space-x-4 rounded-lg md:space-x-6 ">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 ">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 ">
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
		<div className="flex p-4 space-x-4 rounded-lg md:space-x-6 ">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 ">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 darks:text-gray-100">
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
		<div className="flex p-4 space-x-4 rounded-lg md:space-x-6 ">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 ">
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
		<div className="flex p-4 space-x-4 rounded-lg md:space-x-6 ">
			<div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 ">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 ">
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
        </div></>
  )
}

  return (
    <div className='bg-[#e5e5e5] '>
        <Hero/>
        <HotDeals />
        <NewIn/>
        <OtherCatContent />
        <Brands />
        <Testimonials />
        
    </div>
  )
}

export default Home

const sampleDeals = [
  
    {
        "_id": "69b2ef508c518a21f459cadd",
        "name": "Laundry Drawstring Bag",
        "brand": "",
        "price": "2500",
        "sellingPrice": 2200,
        "discount": "300",
        "primaryCategory": "Kitchen Utensils & Home Essentials",
        "imageUrl": "https://i.ibb.co/zTZ1WfjW/Untitled-design.png",
        "imageUrl2": "https://i.ibb.co/F4jXhWfs/IMG-6327.jpg",
        "imageUrl3": "https://i.ibb.co/k2FLFKQW/IMG-6328.jpg",
        "imageUrl4": "https://i.ibb.co/BKTMGxHR/IMG-6326.jpg",
        "date": "2026-03-12 17:52:30",
        "description": "<div><p style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 20.0px 'Times New Roman'; -webkit-text-stroke: #000000;\" id=\"isPasted\"><span style=\"font-family: 'Times New Roman'; font-weight: normal; font-style: normal; font-size: 20.00px; font-kerning: none;\">Cute Bear Laundry Storage Bag – Large Capacity Clothes Organizer</span></p><p style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 12.0px 'Times New Roman'; -webkit-text-stroke: #000000; min-height: 13.8px;\"><br></p><p style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 20.0px 'Times New Roman'; -webkit-text-stroke: #000000;\"><span style=\"font-family: 'Times New Roman'; font-weight: normal; font-style: normal; font-size: 20.00px; font-kerning: none;\">Keep your space neat and clutter-free with this adorable Bear Laundry Storage Bag. Designed with a cute bear face and soft neutral colors, this stylish laundry hamper adds charm to any bedroom, kids’ room, or laundry area.</span></p><p style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 12.0px 'Times New Roman'; -webkit-text-stroke: #000000; min-height: 13.8px;\"><br></p><p style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 20.0px 'Times New Roman'; -webkit-text-stroke: #000000;\"><span style=\"font-family: 'Times New Roman'; font-weight: normal; font-style: normal; font-size: 20.00px; font-kerning: none;\">Made from durable and lightweight fabric, it offers large storage capacity for dirty clothes, towels, blankets, or toys. The drawstring closure helps keep items secure while preventing dust from entering.</span></p><p style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 12.0px 'Times New Roman'; -webkit-text-stroke: #000000; min-height: 13.8px;\"><br></p><p style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 20.0px 'Times New Roman'; -webkit-text-stroke: #000000;\"><span style=\"font-family: 'Times New Roman'; font-weight: normal; font-style: normal; font-size: 20.00px; font-kerning: none;\">This laundry bag is foldable and easy to carry, making it perfect for everyday home organization.</span></p><p style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 12.0px 'Times New Roman'; -webkit-text-stroke: #000000; min-height: 13.8px;\"><br></p><p style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 20.0px 'Times New Roman'; -webkit-text-stroke: #000000;\"><span style=\"font-family: 'Times New Roman'; font-weight: normal; font-style: normal; font-size: 20.00px; font-kerning: none;\">Features:</span></p><p style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 12.0px 'Times New Roman'; -webkit-text-stroke: #000000; min-height: 13.8px;\"><br></p><ul style=\"list-style-type: disc;\"><li style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 20.0px 'Times New Roman'; -webkit-text-stroke: #000000;\"><span style=\"font-family: 'Times New Roman'; font-weight: normal; font-style: normal; font-size: 20.00px; font-kerning: none;\">Large capacity for clothes, towels, blankets, or toys</span></li><li style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 20.0px 'Times New Roman'; -webkit-text-stroke: #000000;\"><span style=\"font-family: 'Times New Roman'; font-weight: normal; font-style: normal; font-size: 20.00px; font-kerning: none;\">Cute bear design that beautifies your room</span></li><li style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 20.0px 'Times New Roman'; -webkit-text-stroke: #000000;\"><span style=\"font-family: 'Times New Roman'; font-weight: normal; font-style: normal; font-size: 20.00px; font-kerning: none;\">Strong, durable, and lightweight material</span></li><li style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 20.0px 'Times New Roman'; -webkit-text-stroke: #000000;\"><span style=\"font-family: 'Times New Roman'; font-weight: normal; font-style: normal; font-size: 20.00px; font-kerning: none;\">Drawstring closure to keep items secure</span></li><li style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 20.0px 'Times New Roman'; -webkit-text-stroke: #000000;\"><span style=\"font-family: 'Times New Roman'; font-weight: normal; font-style: normal; font-size: 20.00px; font-kerning: none;\">Foldable for easy storage</span></li><li style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 20.0px 'Times New Roman'; -webkit-text-stroke: #000000;\"><span style=\"font-family: 'Times New Roman'; font-weight: normal; font-style: normal; font-size: 20.00px; font-kerning: none;\">Suitable for bedroom, bathroom, laundry room, or kids’ room</span></li></ul><p style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 12.0px 'Times New Roman'; -webkit-text-stroke: #000000; min-height: 13.8px;\"><br></p><p style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 12.0px 'Times New Roman'; -webkit-text-stroke: #000000; min-height: 13.8px;\"><br></p><p style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 20.0px 'Times New Roman'; -webkit-text-stroke: #000000;\"><span style=\"font-family: 'Times New Roman'; font-weight: normal; font-style: normal; font-size: 20.00px; font-kerning: none;\">Package Includes:</span></p><p style=\"margin: 0.0px 0.0px 12.0px 0.0px; font: 20.0px 'Times New Roman'; -webkit-text-stroke: #000000;\"><span style=\"font-family: 'Times New Roman'; font-weight: normal; font-style: normal; font-size: 20.00px; font-kerning: none;\">1 × Bear Laundry Storage Bag</span></p><p><br></p><p><br></p><p data-f-id=\"pbf\" style=\"text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;\">Powered by <a href=\"https://www.froala.com/wysiwyg-editor?pb=1\" title=\"Froala Editor\">Froala Editor</a></p></div>",
        "deal": true,
        "popular": false,
        "productID": 1773334352519
    },
    {
        "_id": "687afc372831ce11c28071db",
        "name": "1pc padded mitten",
        "brand": "",
        "price": "3500",
        "sellingPrice": 2000,
        "discount": "1500",
        "primaryCategory": "Kitchen Utensils & Home Essentials",
        "imageUrl": "https://i.ibb.co/MkMBML9N/IMG-2845.jpg",
        "imageUrl2": "https://i.ibb.co/kgbwPKg1/IMG-2848.jpg",
        "imageUrl3": "https://i.ibb.co/6Jr4nvNf/IMG-2847.jpg",
        "imageUrl4": "https://i.ibb.co/TsP9HJ5/IMG-2846.jpg",
        "date": "2025-07-19 03:00:19",
        "description": "",
        "deal": true,
        "popular": false,
        "productID": 1752890423132
    },
    {
        "_id": "687af542f898cfe51724d0b0",
        "name": "37grids silicon ice maker mold",
        "brand": "",
        "price": "3500",
        "sellingPrice": 2500,
        "discount": "1000",
        "primaryCategory": "Kitchen Utensils & Home Essentials",
        "imageUrl": "https://i.ibb.co/G1CyrNm/IMG-2841.jpg",
        "imageUrl2": "https://i.ibb.co/j9PCZZMM/IMG-2842.jpg",
        "imageUrl3": "https://i.ibb.co/Kxd9Km0m/IMG-2843.jpg",
        "imageUrl4": "https://i.ibb.co/nNspNrC0/IMG-2844.jpg",
        "date": "2025-07-19 02:30:41",
        "description": "",
        "deal": true,
        "popular": false,
        "productID": 1752888642455
    },
    {
        "_id": "687af0a712642d65866ead36",
        "name": "50pcs food picker/ fork",
        "brand": "",
        "price": "2000",
        "sellingPrice": 1500,
        "discount": "500",
        "primaryCategory": "Gifts & Souvenirs",
        "imageUrl": "https://i.ibb.co/Kpmw429p/IMG-2835.jpg",
        "imageUrl2": "https://i.ibb.co/wH10pqb/IMG-2837.jpg",
        "imageUrl3": "https://i.ibb.co/ymsNc2Xx/IMG-2838.jpg",
        "imageUrl4": "https://i.ibb.co/Swsv5QZX/IMG-2839.jpg",
        "date": "2025-07-19 02:11:02",
        "description": "",
        "deal": true,
        "popular": false,
        "productID": 1752887463461
    },
    {
        "_id": "687aef5f12642d65866ead35",
        "name": "4in1 popsicle mold",
        "brand": "",
        "price": "5000",
        "sellingPrice": 3500,
        "discount": "1500",
        "primaryCategory": "Kitchen Utensils & Home Essentials",
        "imageUrl": "https://i.ibb.co/qMHwCQbN/IMG-2831.jpg",
        "imageUrl2": "https://i.ibb.co/4wqGfpfZ/IMG-2833.jpg",
        "imageUrl3": "https://i.ibb.co/kV9tVKFN/IMG-2834.jpg",
        "imageUrl4": "https://i.ibb.co/FbqJRb18/IMG-2832.jpg",
        "date": "2025-07-19 02:05:32",
        "description": "",
        "deal": true,
        "popular": false,
        "productID": 1752887135254
    },
    {
        "_id": "687adf7ddd99748c17c0cb55",
        "name": "Brush & toothpaste holder",
        "brand": "",
        "price": "2000",
        "sellingPrice": 1500,
        "discount": "500",
        "primaryCategory": "Kitchen Utensils & Home Essentials",
        "imageUrl": "https://i.ibb.co/yHBZnzn/IMG-2804.jpg",
        "imageUrl2": "https://i.ibb.co/xKmPGZCg/IMG-2807.jpg",
        "imageUrl3": "https://i.ibb.co/6RpP3rdJ/IMG-2806.jpg",
        "imageUrl4": "https://i.ibb.co/d0dmpg8c/IMG-2805.jpg",
        "date": "2025-07-19 00:57:47",
        "description": "",
        "deal": true,
        "popular": false,
        "productID": 1752883069082
    }
]

const otherCatContentData = [
  {
    "name": "Top Gadgets",
    "data": [
      {
        "name": "Vibrating Workout Machine",
        "id": "687aae99b88c258a98b9bc18",
        "link": "https://chicx-6rqm.onrender.com/products/687aae99b88c258a98b9bc18",
        "img": "https://i.ibb.co/nMnQV6Hc/IMG-2768.jpg"
      },
       {
        "name": "Kids LED Watch ",
        "id": "6879a96e7f8ad1d98a0cf621",
        "link": "https://chicx-6rqm.onrender.com/products/6879a96e7f8ad1d98a0cf621",
        "img": "https://i.ibb.co/Qv7cwpP9/IMG-2752.jpg"
      },

       {
        "name": "Multipurpose Table",
        "id": "6691a190def128e0e14d0fdb",
        "link": "https://chicx-6rqm.onrender.com/products/6691a190def128e0e14d0fdb",
        "img": "https://i.ibb.co/mzx3cgG/tb5.jpg"
      },

       {
        "name": "Electric Juice Extractor",
        "id": "6683de4bbaff20ba57dce4cf",
        "link": "https://chicx-6rqm.onrender.com/products/6683de4bbaff20ba57dce4cf",
        "img": "https://i.ibb.co/phwf1F0/IMG-4955.jpg"
      }
    ]
  },

  {
    "name": "Must-have Cookware",
    "data": [
      {
        "name": "Single Grilling Pan",
        "id": "692c0f77c2442f20d6840fac",
        "link": "https://chicx-6rqm.onrender.com/products/692c0f77c2442f20d6840fac",
        "img": "https://i.ibb.co/dJwKkM96/IMG-4649.jpg"
      },
       {
        "name": "Quality Aluminum Cookware ",
        "id": "66858c138f0fbe1cbbebda26",
        "link": "https://chicx-6rqm.onrender.com/products/66858c138f0fbe1cbbebda26",
        "img": "https://i.ibb.co/9tYRPr8/IMG-4990.jpg"
      },

       {
        "name": "Padded Mitten",
        "id": "687afc372831ce11c28071db",
        "link": "https://chicx-6rqm.onrender.com/products/687afc372831ce11c28071db",
        "img": "https://i.ibb.co/MkMBML9N/IMG-2845.jpg"
      },

       {
        "name": "Silicon Spoon Set",
        "id": "6672a7db0ead09b548c64fe3",
        "link": "https://chicx-6rqm.onrender.com/products/6672a7db0ead09b548c64fe3",
        "img": "https://i.ibb.co/ts2BchC/19pcs.jpg"
      }
    ]
  },

]

