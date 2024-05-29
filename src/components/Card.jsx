import React from 'react'

const Card = (props) => {

    const {name, price, discount, imageUrl, description, primaryCategory, secondaryCategory,details} = props.data;
    const formattedNumber = Intl.NumberFormat("en-US").format(price)
    
  return (  
    
    <div className="group my-3 flex  w-60 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            {/* product images and discount */}
        <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
            <img className="peer absolute top-0 right-0 h-full max-w-60 object-cover" src={imageUrl? imageUrl: "https://m.media-amazon.com/images/I/61R+XI5OkOL.jpg"} alt="product image1" />
            {/*other images
            <img className="peer absolute top-0 right-0 h-full max-w-60 object-cover" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60?a=b" alt="product image1" />
            <img className="peer absolute top-0 -right-96 h-full max-w-60  object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image2" />
            <img className="peer absolute top-0 -right-96 h-full max-w-60  object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0" src="https://m.media-amazon.com/images/I/61R+XI5OkOL.jpg" alt="product image" />
                }
            {/*<-- <div class="absolute  bottom-0 mb-4 flex space-x-4 w-full justify-center">
            <div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div> 
            <div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
            <div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
        </div> -->*/}
            <span className="absolute top-0 left-0 m-2 rounded-full bg-secondary px-2 text-center text-xs font-normal text-white">{discount? `${price}% OFF`: null }</span>
        </a>


  <div className="mt-4 px-5 pb-5">
    <a href="#">
      <h5 className="text-sm tracking-tight text-slate-900">{name? name : 'Nike Air MX Super 2500 - Red'} </h5>
    </a>
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