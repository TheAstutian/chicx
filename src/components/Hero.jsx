

import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import hero1 from '../gdvsta1.webp'
import hero from '../hero_image.png'
import hero2 from '../gdvsta2.webp'
import logo1 from '../logo_gvh.png'

const Hero = () => {
  const [active, setActive] = useState(0);
  const totalSlides = 2;
  const carouselRef = useRef(null);

  // Isolated scroll runner that won't touch the main window viewport
  const performScroll = (slideIndex) => {
    const container = carouselRef.current;
    if (container) {
      const containerWidth = container.clientWidth;
      container.scrollTo({
        left: slideIndex * containerWidth,
        behavior: 'smooth',
      });
    }
  };

  const goToSlide = (index) => {
    setActive(index);
    performScroll(index);
  };

  const nextSlide = () => {
    goToSlide(active === totalSlides - 1 ? 0 : active + 1);
  };

  const prevSlide = () => {
    goToSlide(active === 0 ? totalSlides - 1 : active - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((curr) => {
        const next = curr === totalSlides - 1 ? 0 : curr + 1;
        performScroll(next);
        return next;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Added flex and overflow configuration */}
      <div 
        ref={carouselRef} 
        className="carousel w-full scroll-smooth flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
      >
        <div className="carousel-item w-full flex-shrink-0 relative snap-start" id="slide1">
          <Carousel1 />
        </div>
        <div className="carousel-item w-full flex-shrink-0 relative snap-start" id="slide2">
          <Carousel2 />
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-transparent text-3xl p-3 shadow hover:opacity-75 z-20"
        aria-label="Previous slide"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-transparent p-3 shadow text-3xl hover:opacity-75 z-20"
        aria-label="Next slide"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        {[0, 1].map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all duration-500 ${
              active === index ? 'w-6 bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

const Carousel1 = () => {
  return (
    <div className='carousel-item relative w-full h-[250px] md:h-[625px] flex flex-col md:flex-row justify-center mx-auto bg-gradient-to-br from-[#024c4c] via-[#078080] to-[#dff6f5]'>
      <div className='py-10 md:p-0 md:mr-10 md:pl-10 place-self-center z-10'>
        {/*<h1 className='p-3 md:p-0 max-w-2xl md:mb-10 text-2xl md:text-4xl text-black font-medium tracking-tight leading-none md:text-5xl xl:text-6xl'>
          Goldyvhista Hubz
          </h1>*/}
          <div className=' px-3  max-w-[280px] md:max-w-full'>
            <img className='-mb-3 w-40 md:w-1/2 ' src={logo1} />
          </div>
        <p className='px-3 pr-10 mr-10 md:p-0 max-w-2xl mb-3 md:mb-10 font-light text-gray-200 text-xs lg:mb-8 md:text-lg lg:text-xl '>Your Premium Destination for Quality Kitchen Utensils, Kiddies Essentials, Household Supplies, Souvenirs, and so much more! </p>
        <div className='px-3 px-10 md:p-0'>
          <Link to='/products' className='inline-flex items-center justify-center px-3 md:px-5 py-1 md:py-3 mr-1 md:mr-3 text-sm md:text-base font-medium text-center text-extra rounded-sm bg-transparent hover:bg-extra hover:text-white border border-extra '>
            Start Shopping
            <svg className='w-5 h-5 ml-2 -mr-1' fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </Link>
        </div>
      </div>
      <div className='absolute max-w-[280px] sm:max-w-[350px] md:max-w-md md:static place-self-end md:flex '>
        <img src={hero} loading='lazy' className='-z-10 md:z-10 w-32 translate-y-6 md:translate-y-0 md:w-full h-4/5 object-contain' alt="mockup"/>
      </div>
    </div>
  )
}

const Carousel2 = () => {
  return (
    <div className='carousel-item relative w-full h-[250px] md:h-[625px] flex justify-center flex-col md:flex-row mx-auto md:gap-2 bg-gradient-to-br from-[#024c4c] via-[#078080] to-[#dff6f5] '>
      <div className='py-10 md:p-0 md:mr-10 md:pl-10 place-self-center z-10'>
        <span className='px-3 text-xs md:text-lg md:px-0 text-primary '>The</span>
          <h1 className='px-3 font-Candal -mt-2.5 text-extra font-bold md:p-0 max-w-2xl md:mb-10 text-3xl text-black font-medium tracking-tight leading-none md:text-5xl xl:text-6xl'>
            <b>Exclusive List!</b>
          </h1>
        
      {/*<h1 className=' font-Almendra p-3 md:p-0 max-w-2xl md:mb-10 text-2xl md:text-4xl text-black font-medium tracking-tight leading-none md:text-5xl xl:text-6xl'>The Exclusive List! </h1>*/}
        <p className='p-3 pr-10 mr-10  md:p-0 max-w-2xl mb-3 md:mb-10 md:pt-0 font-light text-gray-200 text-xs lg:mb-8 md:text-lg lg:text-xl '>Our store of exclusive wares. Top quality, affordable, and quickly delivered. Made just for you.  </p>
        <div className='p-3  md:p-0'>
          <Link to='/products' state={{tagHeading: 'Exclusives', tags: ['exclusive']}} className='inline-flex items-center justify-center px-3 md:px-5 py-1 md:py-3 mr-1 md:mr-3 text-sm md:text-base font-medium text-center text-extra rounded-sm bg-transparent hover:bg-extra hover:text-white border border-extra '>
            Exclusive Items
            <svg className='w-5 h-5 ml-2 -mr-1' fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </Link>
        </div>
      </div>
      <div className='absolute max-w-[280px] sm:max-w-[350px] md:max-w-md md:static place-self-end md:flex '>
        <img src={hero2} loading='lazy' className='-z-10 md:z-10 translate-x-6 w-[200px] md:w-full h-4/5 object-contain' alt="mockup"/>
      </div>
    </div>
  )
}

export default Hero


/*const Hero = () => {

const [active, setActive] = useState(0);
  const totalSlides = 2;
  const carouselRef = useRef(null)

  const goToSlide = (index) => {
    setActive(index);
    const target = document.getElementById(`slide${index + 1}`);
    target?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };

  const nextSlide = () => {
    goToSlide(active === totalSlides - 1 ? 0 : active + 1);
  };

  const prevSlide = () => {
    goToSlide(active === 0 ? totalSlides - 1 : active - 1);
  };

 useEffect(() => {
    const interval = setInterval(() => {
      setActive((curr) => {
        const next = curr === totalSlides - 1 ? 0 : curr + 1;
        const target = document.getElementById(`slide${next + 1}`);
        target?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        return next;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);


  return (
   <div className="relative w-full overflow-hidden">
      <div ref={carouselRef} className="carousel w-full scroll-smooth">
        <div className={`carousel-item w-full relative `} id="slide1">
          <Carousel1 />
        </div>
        <div className={`carousel-item w-full relative `} id="slide2">
          <Carousel2 />
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-transparent text-3xl p-3 shadow hover:opacity-75"
        aria-label="Previous slide"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-transparent p-3 shadow text-3xl hover:opacity-75"
        aria-label="Next slide"
      >
        ›
      </button>

<div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {[0, 1].map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all duration-500 ${
              active === index ? 'w-6 bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  
  )
}

const Carousel1 = () =>{

    return (

    <div className=' carousel-item relative w-full md:h-8/10 flex flex-col md:flex-row justify-center mx-auto  bg-gradient-to-br from-[#024c4c] via-[#078080] to-[#dff6f5]'>
          
        <div className='py-10 md:p-0 md:mr-10 md:pl-10 place-self-center z-10'>
            <h1 className='p-3 md:p-0 max-w-2xl md:mb-10 text-2xl md:text-4xl text-black font-medium tracking-tight leading-none md:text-5xl xl:text-6xl'>Goldyvhista Hubz</h1>
            <p className='p-3 pr-10 md:p-0 max-w-2xl mb-3 md:mb-10 font-light text-gray-200 text-sm lg:mb-8 md:text-lg lg:text-xl '>Your Premium Destination for Quality Kitchen Utensils, Kiddies Essentials, Household Supplies, Souvenirs, and so much more! </p>
            <div className='p-3 px-10 md:p-0'>
              <Link to='/products' className='inline-flex items-center justify-center px-3 md:px-5 py-1 md:py-3 mr-1 md:mr-3 text-sm md:text-base font-medium text-center text-white rounded-sm bg-transparent hover:bg-tertiary hover:text-gray-300 border border-white '>
               Start Shopping
                <svg className='w-5 h-5 ml-2 -mr-1' fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </Link>
              </div>
              
        </div>

        <div className=' absolute max-w-[280px] sm:max-w-[350px] md:max-w-md md:static place-self-end md:flex '>
            <img src={hero} loading='lazy' className=' -z-10 md:z-10 w-32 translate-y-6 md:translate-y-0 md:w-full h-4/5 object-contain'  alt="mockup"/>
        </div>

    </div>
    )
}

const Carousel2 = () =>{

    return (

    <div className='  carousel-item relative w-full md:h-8/10 flex  justify-center flex-col md:flex-row mx-auto md:gap-2   bg-gradient-to-br from-[#024c4c] via-[#078080] to-[#dff6f5] '>
          
        <div className=' py-10 md:p-0 md:mr-10 md:pl-10 place-self-center z-10'>
            <h1 className='p-3 md:p-0 max-w-2xl md:mb-10 text-2xl md:text-4xl text-black font-medium tracking-tight leading-none md:text-5xl xl:text-6xl'>The Exclusive List! </h1>
            <p className='p-3 pr-10 md:p-0 max-w-2xl mb-3 md:mb-10 font-light text-gray-200 text-sm lg:mb-8 md:text-lg lg:text-xl '>Our store of exclusive wares. Top quality, affordable, and quickly delivered. Made just for you.  </p>
           <div className='p-3 px-10 md:p-0'>
                <Link to='/products' state={{tagHeading: 'Exclusives', tags: ['exclusive']}} className='inline-flex items-center justify-center px-3 md:px-5 py-1 md:py-3 mr-1 md:mr-3 text-sm md:text-base font-medium text-center text-white rounded-sm bg-transparent hover:bg-tertiary hover:text-gray-300 border border-white '>
                  Exclusive Items
                    <svg className='w-5 h-5 ml-2 -mr-1' fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </Link>
           </div>
            
        </div>
        <div className=' absolute max-w-[280px] sm:max-w-[350px] md:max-w-md md:static place-self-end md:flex '>
            <img src={hero2} loading='lazy' className=' -z-10 md:z-10 translate-x-6 w-[200px] md:w-full h-4/5 object-contain' alt="mockup"/>
        </div>
    </div>
    )
}


export default Hero

*/