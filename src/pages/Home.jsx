import React from 'react'

import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials';
import Card from '../components/Card';

const products = [
    {
      id: 1,
      name: 'Samsung Galaxy S21',
      description: 'Latest model with advanced features',
      price: 450000.00,
      primaryCategory: 'Electronics',
      secondaryCategory: 'Mobile Phones',
      imageUrl: 'https://example.com/images/samsung-galaxy-s21.jpg',
      details: 'The Samsung Galaxy S21 offers a new camera design, a faster processor, and better software features.',
      date: '2024-02-15',
    },
    {
      id: 2,
      name: 'Apple iPhone 12',
      description: 'Smartphone with A14 Bionic chip',
      price: 550000.00,
      primaryCategory: 'Electronics',
      secondaryCategory: 'Mobile Phones',
      imageUrl: 'https://example.com/images/iphone-12.jpg',
      details: 'The Apple iPhone 12 features 5G speed, A14 Bionic, the fastest chip in a smartphone, and a Ceramic Shield front cover.',
      date: '2024-03-20',
    },
    {
      id: 3,
      name: 'HP Spectre x360',
      description: 'Convertible laptop with touch screen',
      price: 750000.00,
      primaryCategory: 'Computers',
      secondaryCategory: 'Laptops',
      imageUrl: 'https://example.com/images/hp-spectre-x360.jpg',
      details: 'The HP Spectre x360 is a premium 2-in-1 device with a sleek design, long battery life, and powerful performance.',
      date: '2024-04-05',
    },
    {
      id: 4,
      name: 'Dell XPS 13',
      description: 'Ultrabook with InfinityEdge display',
      price: 680000.00,
      primaryCategory: 'Computers',
      secondaryCategory: 'Laptops',
      imageUrl: 'https://example.com/images/dell-xps-13.jpg',
      details: 'The Dell XPS 13 offers a stunning display, excellent build quality, and a powerful Intel processor.',
      date: '2024-05-10',
    },
    {
      id: 5,
      name: 'Sony WH-1000XM4',
      description: 'Noise cancelling wireless headphones',
      price: 150000.00,
      primaryCategory: 'Audio',
      secondaryCategory: 'Headphones',
      imageUrl: 'https://example.com/images/sony-wh-1000xm4.jpg',
      details: 'The Sony WH-1000XM4 headphones provide exceptional noise cancellation, high-quality sound, and comfortable design.',
      date: '2024-06-15',
    },
    {
      id: 6,
      name: 'Bose SoundLink Revolve',
      description: 'Portable Bluetooth speaker',
      price: 100000.00,
      primaryCategory: 'Audio',
      secondaryCategory: 'Speakers',
      imageUrl: 'https://example.com/images/bose-soundlink-revolve.jpg',
      details: 'The Bose SoundLink Revolve delivers deep, loud, and immersive sound in every direction.',
      date: '2024-07-05',
    },
    {
      id: 7,
      name: 'Nike Air Max 270',
      description: 'Comfortable and stylish sneakers',
      price: 65000.00,
      primaryCategory: 'Footwear',
      secondaryCategory: 'Sneakers',
      imageUrl: 'https://example.com/images/nike-air-max-270.jpg',
      details: 'The Nike Air Max 270 features the first-ever Max Air unit created for lifestyle wear, with a design inspired by icons of the big Air era.',
      date: '2024-02-22',
    },
    {
      id: 8,
      name: 'Adidas Ultraboost',
      description: 'Running shoes with Boost cushioning',
      price: 70000.00,
      primaryCategory: 'Footwear',
      secondaryCategory: 'Running Shoes',
      imageUrl: 'https://example.com/images/adidas-ultraboost.jpg',
      details: 'The Adidas Ultraboost offers responsive Boost cushioning and a Primeknit upper for adaptive support and comfort.',
      date: '2024-03-30',
    },
    {
      id: 9,
      name: 'Samsung QLED TV',
      description: 'Smart TV with 4K resolution',
      price: 1200000.00,
      primaryCategory: 'Electronics',
      secondaryCategory: 'Televisions',
      imageUrl: 'https://example.com/images/samsung-qled-tv.jpg',
      details: 'The Samsung QLED TV offers stunning 4K picture quality with vibrant colors and smart TV features.',
      date: '2024-04-10',
    },
    {
      id: 10,
      name: 'Apple MacBook Air',
      description: 'Lightweight laptop with M1 chip',
      price: 850000.00,
      primaryCategory: 'Computers',
      secondaryCategory: 'Laptops',
      imageUrl: 'https://example.com/images/macbook-air.jpg',
      details: 'The Apple MacBook Air features the new M1 chip, delivering exceptional performance and long battery life in a sleek design.',
      date: '2024-05-22',
    },
    {
      id: 11,
      name: 'Sony PlayStation 5',
      description: 'Next-generation gaming console',
      price: 400000.00,
      primaryCategory: 'Gaming',
      secondaryCategory: 'Consoles',
      imageUrl: 'https://example.com/images/ps5.jpg',
      details: 'The Sony PlayStation 5 offers lightning-fast loading, a new generation of PlayStation games, and immersive gaming experiences.',
      date: '2024-06-12',
    },
    {
      id: 12,
      name: 'Microsoft Xbox Series X',
      description: 'Powerful gaming console',
      price: 420000.00,
      primaryCategory: 'Gaming',
      secondaryCategory: 'Consoles',
      imageUrl: 'https://example.com/images/xbox-series-x.jpg',
      details: 'The Xbox Series X is the most powerful Xbox ever, with faster load times, higher frame rates, and more dynamic worlds.',
      date: '2024-07-01',
    },
    {
      id: 13,
      name: 'Canon EOS R5',
      description: 'Professional mirrorless camera',
      price: 1500000.00,
      primaryCategory: 'Cameras',
      secondaryCategory: 'Mirrorless',
      imageUrl: 'https://example.com/images/canon-eos-r5.jpg',
      details: 'The Canon EOS R5 offers high-resolution images, 8K video recording, and exceptional autofocus performance.',
      date: '2024-02-25',
    },
    {
      id: 14,
      name: 'Sony A7 III',
      description: 'Versatile full-frame mirrorless camera',
      price: 1000000.00,
      primaryCategory: 'Cameras',
      secondaryCategory: 'Mirrorless',
      imageUrl: 'https://example.com/images/sony-a7-iii.jpg',
      details: 'The Sony A7 III offers a superb blend of resolution, speed, and features in a compact body.',
      date: '2024-03-18',
    },
    {
      id: 15,
      name: 'Apple iPad Pro',
      description: 'High-performance tablet with M1 chip',
      price: 500000.00,
      primaryCategory: 'Tablets',
      secondaryCategory: 'iOS Tablets',
      imageUrl: 'https://example.com/images/ipad-pro.jpg',
      details: 'The Apple iPad Pro features the powerful M1 chip, a stunning Liquid Retina display, and advanced cameras.',
      date: '2024-04-28',
    },
    {
      id: 16,
      name: 'Samsung Galaxy Tab S7',
      description: 'High-end Android tablet',
      price: 350000.00,
      primaryCategory: 'Tablets',
      secondaryCategory: 'Android Tablets',
      imageUrl: 'https://example.com/images/galaxy-tab-s7.jpg',
      details: 'The Samsung Galaxy Tab S7 offers a high-refresh-rate display, powerful performance, and an S Pen for productivity.',
      date: '2024-05-15',
    },
    {
      id: 17,
      name: 'Amazon Kindle Paperwhite',
      description: 'E-reader with high-resolution display',
      price: 90000.00,
      primaryCategory: 'E-readers',
      secondaryCategory: 'Tablets',
      imageUrl: 'https://example.com/images/kindle-paperwhite.jpg',
      details: 'The Kindle Paperwhite offers a high-resolution display, waterproof design, and adjustable warm light.',
      date: '2024-06-20',
    },
    {
      id: 18,
      name: 'Fitbit Charge 5',
      description: 'Advanced fitness and health tracker',
      price: 120000.00,
      primaryCategory: 'Wearables',
      secondaryCategory: 'Fitness Trackers',
      imageUrl: 'https://example.com/images/fitbit-charge-5.jpg',
      details: 'The Fitbit Charge 5 offers advanced fitness and health tracking features, including GPS, heart rate monitoring, and stress management tools.',
      date: '2024-07-10',
    },
  ]
  

const Home = () => {


  return (
    <div className='bg-[#e5e5e5]'>
        <Hero/>
        <h1 className='px-4 py-2 ml-10 text-2xl text-color-primary'>Latest deals</h1>

        <div className='carousel w-5/6 px-3 mx-auto rounded-box'> 
          <div className='carousel-item'>
          <Card />
          </div>

          <div className='carousel-item'>
          <Card />
          </div>

          <div className='carousel-item'>
          <Card />
          </div>

          <div className='carousel-item'>
          <Card />
          </div>

          <div className='carousel-item'>
          <Card />
          </div>

        </div>

        <div className="carousel rounded-box">
  <div className="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" alt="Burger" />
  </div> 
  <div className="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" alt="Burger" />
  </div> 
  <div className="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" alt="Burger" />
  </div> 
  <div className="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" alt="Burger" />
  </div> 
  <div className="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" alt="Burger" />
  </div> 
  <div className="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" alt="Burger" />
  </div> 
  <div className="carousel-item">
    <img src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" alt="Burger" />
  </div>
</div> 
   
       
        <Testimonials />
    </div>
  )
}

export default Home