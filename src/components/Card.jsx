import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {

    const {name, price, discount, imageUrl,_id} = props.data;
    let id;
    if (_id){
      id=_id.toString()
    }
   

  let displayPrice;
  let displayDiscount;
  if(discount){

    displayPrice = price- discount;
    displayDiscount = Math.round(discount/price*1000)/10
  } 
  const formattedNumber = Intl.NumberFormat("en-US").format(displayPrice)
     

/*
    let displayPrice;
    if(discount){
      displayPrice = price*(1-(discount/100))
    } else{
      displayPrice = price;
    }
       
    const formattedNumber = Intl.NumberFormat("en-US").format(displayPrice)*/
    
  return (  
    
    <div className="group my-3 flex  w-60 flex-col h-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:opacity-80 hover:border-tertiary ">
            {/* product images and discount */}
        <Link className="" to={`/products/${id}`}>
            <div className='relative mx-3 mt-5 flex h-60 overflow-hidden rounded-xl'>
              <img className="peer absolute top-0 right-0 h-full  object-center" src={imageUrl? imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"} alt="product image1" />          
            <span className="absolute top-0 left-0 m-2 rounded-full bg-secondary px-2 text-center text-xs font-normal text-white">{discount>0? `${displayDiscount}% OFF`: null }</span>
            </div>
        </Link>


  <div className="mt-4 px-5 ">
    
      <div className='h-10'>
      <h5 className="text-sm tracking-tight line-clamp-2 text-slate-900">{name? name : 'Not Available'} </h5>
      </div>
    
    <div className="mt-2 mb-1 flex items-center justify-between">
      <p>
        <span className="text-sm font-bold  text-slate-900">₦{price? formattedNumber: 'NAN'} </span>
        <span className="text-xs text-slate-900 line-through">{discount? `₦${price}`: ''}</span>
      </p>
    </div>{/**
    <a href="#" className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      Add to cart</a> */}
  </div>
</div>

  )
}

export default Card