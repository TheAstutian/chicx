import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Turnstile } from '@marsidev/react-turnstile'
import axios from 'axios';
import gdvsta from '../GDVSTA.PNG';

import { API_URL } from '../App';
import { AuthContext } from '../ContextStore';

const AdminLogin = () => {

 const [inputs,setInputs] = useState({
    email:"",
    password:""
 })
 const [errorMessage, setErrorMessage] = useState("")
 const [status, setStatus] = React.useState()

 const navigate = useNavigate();
 const {login} = useContext(AuthContext)

 const handleChange = e=>{
    setErrorMessage("")
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
 }


const verifyTraffic = async (token)=>{
    //console.log(token,'the token is here')
    try{

        const payload = {token: token}
        const verifyToken = await axios.post(`${API_URL}/turnstile`, payload)
        if(verifyToken){
            setStatus('solved')
        } 
        return  
    }catch(err){
        console.log(err)
    } 
} 
 const handleSubmit = async e =>{
    
    e.preventDefault() 
    
    if (status==='solved') {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (inputs.email==="" || !inputs.email){
            setErrorMessage("Please enter your email address. ")
            return 
        } else if (inputs.password==="" || !inputs.password){
            setErrorMessage("Please enter your password")
            return 
        } else if (!emailRegex.test(inputs.email)){
            setErrorMessage("Please enter a valid email address")
            return 
        }

        
        try{
            await login(inputs) 
        navigate('/products')
    
        }catch(err){
            if(err.response.data){
                setErrorMessage(err.response.data)
            }
        }
    }
    
    
 }

  return ( 
    <div>
        <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="/" className="flex items-center mb-3 text-2xl font-semibold text-tertiary ">
                <img className="w-20 h-15 " src={gdvsta} alt="logo" />
                Goldyvhista Hubz
            </a> 
            <div className="w-full bg-white rounded-lg shadow   md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Login
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                            <input onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required="" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5"> 
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500 ">Remember me</label>
                                </div>
                            </div>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a>
                         
                        </div>
                        <p className='mt-2 pl-2 text-red-500 text-xs text'>{errorMessage&& errorMessage}</p>
                        <button onClick={handleSubmit} disabled={status==="solved"? false : true} type="submit" className={status!="solved"? 'w-full bg-gray-500 text-sm px-5 py-2.5 text-center font-medium rounded-lg ':`w-full cursor-pointer text-white bg-tertiary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center` }>Sign in</button>
                        <p className="text-sm font-light text-gray-500 ">
                            Don’t have an account yet? <Link to="/adminregister" className="font-medium text-primary-600 hover:underline ">Sign up</Link>
                        </p>
                        <Turnstile 
                        siteKey={process.env.REACT_APP_TURNSTILE_SITE_KEY}
                            onError={() => setStatus('error')}
                              onExpire={() => setStatus('expired')}
                        onSuccess={verifyTraffic}
                         />
                    </form>
                </div>
            </div>
        </div>
        </section>
    </div>
  )
}

export default AdminLogin