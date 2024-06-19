import React, {useState, useContext} from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../ContextStore';
import { API_URL } from '../App';

const NewProduct = () => {
   
    const [image, setImage]=useState("")

    const [name, setName] = useState("")
    const [brand,setBrand] = useState("")
    const [price,setPrice] = useState("")
    const [discount, setDiscount]= useState("")
    const [description, setDescription] =useState("")
    const [category, setCategory]=useState('')
    const [error,setError] = useState('')

    const api = process.env.REACT_APP_API_KEY

    const {currentUser} = useContext(AuthContext);
/*useEffect(()=>{

},[name])*/

const upload = async()=>{
    try{
        if(!image) {
            return null;
        } else if (image.name){
            const imageupload = new FormData();
            imageupload.set('key', api)
            imageupload.append('image',image)
            const imagelink = await axios.post('https://api.imgbb.com/1/upload', imageupload)
            console.log(imagelink.data.data.image.url)
        }

    }catch(err){
        console.log(err)
    }
}
 

const onSubmit =async e =>{
    e.preventDefault();
    if(!currentUser) return;

    try{
        const imglnk = await upload();
        await axios.post(`${API_URL}/auth/admin-add`, {
            name, brand, price, discount,description, category,imglnk
        })

    }catch(err){
        console.log(err)
    }
    alert("new product successfully added")

    console.log(name,brand,price,discount,description,category)
}
 
  return (
    <div>
        <section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
      <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                  <input type="text" name="name" onChange={e=>setName(e.target.value)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""/>
              </div> 
              <div className="w-full">
                  <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                  <input type="text" name="brand" id="brand" onChange={e=>setBrand(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required=""/>
              </div>
              <div className="w-full">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                  <input type="number" name="price" onChange={e=>setPrice(e.target.value)} id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Numbers only, no symbols, e.g. ₦15,000" required=""/>
              </div>
              <div className="w-full">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount</label>
                  <input type="number" name="discount" onChange={e=>setDiscount(e.target.value)} id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Numbers only, no symbols, e.g. 20" required=""/>
              </div>
              <div>
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Category</label>
                  <select id="category" value={category} onChange = {e=>setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option defaultValue="">Select category</option>
                      <option value="Wall Decors">Wall Decors</option>
                      <option value="Kitchen">Kitchen</option>
                      <option value="Resin Craft Tools & Materials">Resin Craft Tools & Materials</option>
                      <option value="Home Exercise">Home Exercise</option>
                      <option value="Souvenirs">Souvenirs Idea</option>
                      <option value="Kiddies">Kiddies</option>
                      <option value="Bedroom">Bedroom</option>
                      <option value="Bath and Toilet">Bath & Toilet</option>
                  </select>
              </div>    
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 ' htmlFor='file'>Product Image</label>
                <input type='file' name='' id="image" onChange={e=>setImage(e.target.files[0])} />
            </div>    
              <div>
                  <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
                  <input type="number" name="item-weight" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" required=""/>
              </div> 
               <div className="sm:col-span-2">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <textarea id="description" rows="8" onChange={e=>{setDescription(e.target.value)}} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
              </div>
          </div>
          <button type="submit" onClick={onSubmit} className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-tertiary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-secondary">
              Add product
          </button>
      </form>
  </div>
</section>

    </div>
  )
}

export default NewProduct



/*    const categories = [
      {  name: "", 
        subs: [ "Cookware", "Cleaners", "Etc" ]},

    {  name: "Kitchen", 
       subs: ["Cookware", "Cleaners", "Etc" ]},

    {  name: "Kitchen", 
       subs: ["Cookware", "Cleaners", "Etc"  ]},

     {  name: "Kitchen", 
        subs: ["Cookware", "Cleaners", "Etc"]},
                        
    ]*/