import React, {useState, useContext, useRef, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../ContextStore';
import { API_URL } from '../App';

import { SimpleEditor } from '../@/components/tiptap-templates/simple/simple-editor'

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import  FroalaEditor from 'react-froala-wysiwyg';


import 'froala-editor/css/plugins.pkgd.min.css'; // Import plugin CSS if required

import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/font_size.min.js';

import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/colors.min.js'; 
// Import other plugins as needed


    const initialTags = {
        "new": false, 
        "kitchen": false, 
        "bedroom": false,
        "bathroom": false,
        "kids": false,
        "baby": false,
        "men": false,
        "women":false,
        "gift":false,
        "cookware": false,
        "baking": false,
        "decor": false,
        "hot": false,
        "laundry":false,
        "storage":false,
        "electricals":false,
        "fitness":false,
        "soldout":false,
        "clearance":false
    }


const NewProduct = () => {
    const state = useLocation().state; 

    const [image, setImage]=useState(state?.imageUrl||"")

    const [image2, setImage2]=useState(state?.imageUrl2||"")
    const [image3, setImage3]=useState(state?.imageUrl3||"")
    const [image4, setImage4]=useState(state?.imageUrl4||"")

    const [name, setName] = useState(state?.name||"")
    const [brand,setBrand] = useState(state?.brand||"")
    const [price,setPrice] = useState(state?.price||"")
    const [discount, setDiscount]= useState(state?.discount||"")
    const [description, setDescription] =useState(state?.description||"")
    const [category, setCategory]=useState(state?.primaryCategory||'')
    const [deal, setDeal] = useState(state?.deal|| false)
    const [popular, setPopular] = useState(state?.popular|| false)
    const [error,setError] = useState('')

    const [highlights, setHighlights] = useState(state?.highlights || "")
    const [itemTags, setItemTags] = useState(initialTags)


    const api = process.env.REACT_APP_API_KEY

    const {currentUser} = useContext(AuthContext);
    const currentUserRef = useRef(currentUser)
    const navigate = useNavigate()
 
useEffect (()=>{
configureTags()

},[])

/*useEffect(() => {
  console.log("The tags have updated:", itemTags);
}, [itemTags]);*/

const sampleTags = ["baby", "bedroom", "kitchen", "hot", "storage", "laundry"]

const configureTags =()=>{
    if (state?.tags== null || !state?.tags  ) return 
const updatedTags = {...itemTags    } 
for (const tagKey in updatedTags) { 

    if(state.tags.includes(tagKey)){     // Copy all existing tags
    updatedTags[tagKey]= true    // Overwrite the specific tag (e.g., "baby")
  }
    } 
    setItemTags(updatedTags)
}

const toggleTag = (tagName) => {
  setItemTags(prevTags => ({
    ...prevTags,
    [tagName]: !prevTags[tagName] // Toggle between true/false
  }));
};

const toggleTags = (tagName)=>{
    setItemTags({...itemTags, [tagName]: !itemTags[tagName]})
}

const TagSystem = ()=>{

    return(
        <>
        <h1 className='p-2'>Tags here</h1>
        <div className='flex flex-wrap p-2 border border-slate-200 rounded-md bg-slate-50 '>
            {
            Object.entries(itemTags).map(([tagName, isActive])=>(
                
                <span 
                key={tagName} 
                className={`px-2 py-1 m-2 ${isActive? 'bg-slate-400 text-gray-50 border-slate-50': 'bg-neutral-50'} text-sm md:text-md border border-black rounded-lg cursor-pointer hover:bg-slate-300 hover:text-gray-700 hover:border-gray-700`}
                onClick={()=>{toggleTags(tagName)}}
                >
                    {tagName}
                </span>
            )
            )
            }
        </div>
        </>
    )
}


const upload = async(image)=>{
    try{
        if(!image) {
            return null;
        } else if (image.name){
            const imageupload = new FormData();
            imageupload.set('key', api)
            imageupload.append('image',image)
            const response = await axios.post('https://api.imgbb.com/1/upload', imageupload)
            
            return response.data.data.image.url;
        }

    }catch(err){
        console.log(err)
    }
}



const onSubmit =async e =>{
    e.preventDefault();
    if(!currentUser) return; 
    const sellingPrice = price-discount
    const tags = []
    Object.entries(itemTags).forEach(([tagName, value])=>{
        if (value){
            tags.push(tagName)
        }
    })

    const uploadImage = async(image)=>{
        if(image&&image.name){
            return await upload(image)
        } else{
            return image;
        }
    }


    if (state){
       
        try{
            const imglnk = await uploadImage(image);
            const imglnk2 = await uploadImage(image2);
            const imglnk3 = await uploadImage(image3);
            const imglnk4 = await uploadImage(image4);

            await axios.patch(`${API_URL}/auth/admin-update`, {
            name, brand, price, sellingPrice, tags, discount,description, category,id:state._id, imglnk, imglnk2, imglnk3, imglnk4, deal,highlights, popular}
        )
        alert("Product updated successfully ")
        navigate(`/products/${state._id.toString()}`)
        return 
        }catch(err){ 
            console.log(err)       
        }     
          
    }else {
        try{
            const imglnk = await uploadImage(image);
            const imglnk2 = await uploadImage(image2);
            const imglnk3 = await uploadImage(image3);
            const imglnk4 = await uploadImage(image4);
            await axios.post(`${API_URL}/auth/admin-add`, {
                name, brand, price, tags, sellingPrice, discount,description, category,imglnk, deal, popular, imglnk2, imglnk3, imglnk4, highlights,
                date:  moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
            })

         }catch(err){
              console.log(err)
          }
    alert("new product successfully added")
    navigate("/products") 
}    
    
}
 
  return (
    currentUserRef.current.type==='admin'&&(

        <div>
        <section className="bg-white ">
  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900 ">Add a new product</h2>
      <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Product Name</label>
                  <input type="text" value={name} name="name" onChange={e=>setName(e.target.value)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type product name" required=""/>
              </div> 
              <div className="w-full">
                  <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 ">Brand</label>
                  <input type="text" value={brand} name="brand" id="brand" onChange={e=>setBrand(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Product brand" required=""/>
              </div>
              <div className="w-full">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                  <input type="number" value={price} name="price" onChange={e=>setPrice(e.target.value)} id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Numbers only, no symbols, e.g. ₦15,000" required=""/>
              </div>
              <div className="w-full">
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Discount</label>
                  <input type="number" name="discount" onChange={e=>setDiscount(e.target.value)} id="discount" value={discount} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Original Price - Selling Price. No commas " required=""/>
              </div>
              <div>
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 "> Category</label>
                  <select id="category" value={category} onChange = {e=>setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ">
                      <option defaultValue="">Select category</option>
                      <option value="Kitchen Utensils & Home Essentials">Kitchen Utensils & Home Essentials</option>
                      <option value="Gifts & Souvenirs">Gifts & Souvenirs</option>
                      <option value="Babies & Kids">Babies & Kids</option>
                      <option value="Decors">Decors</option>
                      <option value="Exercise & Fitness Supplies">Exercise & Fitness Supplies</option>
                      <option value="Resin Materials & Tools">Resin Materials & Tools</option>
                      
                  </select>
              </div>    
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 ' htmlFor='file'>Product Image 1</label>
                <input type='file' name='' id="image"  onChange={e=>setImage(e.target.files[0])} />
            </div>    
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 ' htmlFor='file'>Product Image 2</label>
                <input type='file' name='' id="image2"  onChange={e=>setImage2(e.target.files[0])} />
            </div>    
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 ' htmlFor='file'>Product Image 3</label>
                <input type='file' name='' id="image3"  onChange={e=>setImage3(e.target.files[0])} />
            </div>    
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 ' htmlFor='file'>Product Image 4</label>
                <input type='file' name='' id="image4"  onChange={e=>setImage4(e.target.files[0])} />
            </div>    
              <div className='flex items-center mb-4'>
                  <label htmlFor="deals"   className="block mb-2 text-sm font-medium text-gray-900 ">Add to latest deals?</label>
                  <input type="checkbox"  checked={deal} onChange={()=>setDeal(!deal)} name="deals" id="deals" className="checkbox checkbox-sm checkbox-tertiary m-1 mt-0 ml-10 "  required=""/>
                  
              </div> 
              
              <div className='flex items-center mb-4'>
                  <label htmlFor="popular"   className="block mb-2 text-sm font-medium text-gray-900 ">Add to popular items?</label>
                  <input type="checkbox"  checked={popular} onChange={()=>setPopular(!popular)} name="popular" id="popular" className="checkbox checkbox-sm checkbox-tertiary m-1 mt-0 ml-10 "  required=""/>
                  
              </div> 
              <div className='sm:col-span-2 mb-5 md:mb-10 '>
                <TagSystem />
              </div>
               <div className="sm:col-span-2">
                  <label htmlFor="highlights" className="block mb-2 text-sm font-medium text-gray-900 ">Product Highlights</label>
                 <div className=' mb-5 h-64'>
                    <SimpleEditor content={highlights} onChange={event=>{setHighlights(event)}} />
                 </div>
              </div> 

              
               <div className="sm:col-span-2">
                   {/* <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                    <FroalaEditor className='text-black'
                                    tag='textarea'
                                    model={description}
                                    onModelChange={event=>{setDescription(event)}}
                                    config={config}
                                    value={description}
                                    />*/}
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 "> Description</label>
                   <div className='h-svh'>
                      <SimpleEditor 
                            content={description}
                            onChange={event=>{setDescription(event)}}
                     />
                   </div>

                  {/*<label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <textarea id="description" rows="8" onChange={e=>{setDescription(e.target.value)}} value={description}className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>*/}
              </div>
          </div>
          <button type="submit" onClick={onSubmit} className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-tertiary rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-secondary">
             {state? "Update Product": "Add product"} 
          </button>
      </form>
  </div>
</section>

    </div>
    )
  )
}

export default NewProduct


