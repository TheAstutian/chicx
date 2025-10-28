import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import gdvsta from '../GDVSTA.PNG';
import { API_URL } from '../App';
import { Turnstile } from '@marsidev/react-turnstile'


const AdminRegister = () => {
const [inputs, setInputs] = useState({
    email:"",
    password:"",
    confirmPassword:""
});
const [errorMessage, setErrorMessage] = useState("")
const [termsChecked, setTermsChecked] = useState(false)
const [status, setStatus] = useState()

const [error, setError] = useState(""); 
const navigate = useNavigate()

const handleChange = e =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value.toLowerCase()}))
   
}

const verifyTraffic = async (token)=>{
    //console.log(token,'the token is here')
    try{

        const payload = {token: token}
        const verifyToken = await axios.post(`${API_URL}/turnstile`, payload)
        if(verifyToken){
            setStatus('solved')
            console.log(verifyToken)
        } 
        return  
    }catch(err){
        console.log(err)
    } 
} 

const checkHandler = ()=>{
    setTermsChecked(!termsChecked)
}

const handleSubmit = async e =>{
    e.preventDefault()
    setErrorMessage("")
    if (!inputs.email||!inputs.password){
        setErrorMessage("Please enter email and passowrd")
    } else if ( !inputs.confirmPassword) {
        setErrorMessage("Error. Confirm password")
    }else if ( inputs.password!==inputs.confirmPassword) {
     setErrorMessage("Error. Passwords don't match")
    } else if (!termsChecked){
        setErrorMessage("Accept terms and conditions")
    } else{
       try{
       const regSuccess = await axios.post(`${API_URL}/auth/admin-register`, {inputs})
        if(regSuccess){
            navigate(`/Regconfirm?status=verifyemail&username=${inputs.email}`)
        } else {
            setErrorMessage("An error occurred with the registration, please try again later")
        }
        
       }catch(err){
        console.log(err.response.data)
       setErrorMessage(err.response.data)
       }
    }
    
}

    return (
        <div>
             <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-tertiary dark:text-white">
                        <img className="w-20 h-15" src={gdvsta}  alt="logo"/>
                        Goldyvhista Hubz
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1> 
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" onChange={handleChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                                </div>
                                <div> 
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" onChange={handleChange}  name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input type="password" onChange={handleChange} name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" checked={termsChecked} onChange={checkHandler}className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                        <p className='mt-2 pl-2 text-red-500 text-xs text'>{errorMessage&& errorMessage}</p>
                                    </div>
                                </div>
                                <button type="submit" disabled={status==="solved"? false: true} onClick={handleSubmit} className={status!="solved"? "w-full bg-gray-500 text-sm px-5 py-2.5 text-center font-medium rounded-lg" : "w-full text-white bg-tertiary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"}>Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to="/adminlogin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
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

export default AdminRegister