import React, { useContext, useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react'; // Modern icon set
import { Link } from 'react-router-dom';
import { CartContext } from '../ContextStore';

const Card = ({ data }) => {
  const { name, price, discount, imageUrl, _id } = data;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [notification, setNotification] = useState({show:false, message:""})
     let id;
    if (_id){
      id=_id.toString()
    }
    const{ addToCart}= useContext(CartContext)
    const handleAddtoCart = () =>{
      addToCart(data)
      showNotification(`Item added to your cart!`)
    }

const showNotification=(message)=>{
  setNotification({show:true, message})
  
  setTimeout(()=>{
    setNotification({show:false, message:''})
  }, 3000)
}

  return (
    <div className="group relative flex w-full max-w-[160px] md:max-w-[240px] flex-col overflow-hidden rounded-md border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      
      {/* 1. IMAGE SECTION WITH OVERLAYS */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <Link to={`/products/${id}`}>
          <img 
            src={imageUrl? imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"} 
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          /> 
        </Link>

        {/* Wishlist Button (UX: Immediate Action) */}
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
        >
          <Heart size={18} className={isWishlisted ? "fill-red-500 stroke-red-500" : "stroke-slate-600"} />
        </button>

        {/* Discount Badge (UI: High Contrast) */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 rounded-lg bg-black px-2 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
            -{Math.round((discount/price)*100)}%
          </div>
        )}

        {/* Quick Add Overlay (UX: Reduce Clicks) */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0 bg-gradient-to-t from-black/60 to-transparent">
          <button onClick={handleAddtoCart} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-sm font-bold text-slate-900 shadow-lg transition-transform active:scale-95">
            <ShoppingCart size={16} />
             Add to Cart
          </button>
        </div>
      </div>

      {/* 2. PRODUCT INFO SECTION */}
      <div className="flex flex-col p-2 md:p-4">
        
        <Link to={`/products/${id}`} className="mb-2">
          <h3 className="line-clamp-1 text-sm md:text-base md:font-semibold text-slate-800 ">
            {name}
          </h3>
        </Link>

        {/* Pricing Hierarchy (UI: Size indicates importance) */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm md:text-xl font-black text-slate-900">₦{Number(price - discount).toLocaleString()}</span>
          {discount > 0 && (
            <span className="text-xs md:text-sm font-medium text-slate-400 line-through">₦{price.toLocaleString()}</span>
          )}
        </div>
      </div>
        {notification.show && (
        <div className="fixed top-5 right-0 m-4 p-2 bg-gray-100 border border-gray-300 font-semibold text-sm text-gray-600 rounded shadow-md">
          {notification.message}
        </div>)}
    </div>
  );
};

export default Card; 


/* {import React from 'react';
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
    
/*  return (  
    
    <div className="group my-3 flex w-60 flex-col h-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:opacity-80 hover:border-tertiary ">
            
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

export default Card */