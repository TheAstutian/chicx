import React from 'react';
import { Link } from 'react-router-dom';
import { capitalizeTitle } from '../pages/Products';
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
    
    <div className="group my-3 flex w-60 flex-col h-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:opacity-80 hover:border-tertiary ">
            {/* product images and discount */}
        <Link className="" to={`/products/${id}`}>
            <div className='relative mx-3 mt-5 flex h-60 overflow-hidden rounded-xl'>
              <img className="peer absolute top-0 right-0 h-full  object-center" src={imageUrl? imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"} alt="product image1" />          
            <span className="absolute top-0 left-0 m-2 rounded-full bg-secondary px-2 text-center text-xs font-normal text-white">{discount>0? `${displayDiscount}% OFF`: null }</span>
            </div>
        </Link>


  <div className="mt-4 px-5 ">
      <div className='h-5 md:h-10'>
      <h5 className="text-sm font-medium tracking-tight line-clamp-2 text-slate-900">{name? capitalizeTitle(name) : 'Not Available'} </h5>
      </div>
    
    <div className="mt-1 md:mt-2 md:mb-1 flex items-center justify-between">
      <p>
        <span className="text-sm font-bold  text-slate-900">₦{price? formattedNumber: 'NAN'} </span>
        <span className="text-xs text-slate-900 line-through">{discount? `₦${price}`: ''}</span>
      </p>
    </div> 
  </div>
</div>

  )
}

export default Card