import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



const UserRegister = () => {
const [user,setUser] = useState(null);
const [error, setError] = useState(null); 





    return (
        <div>
             <section className="bg-gray-50 darks:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 darks:text-white">
                        <img className="w-8 h-8 mr-2" src="https://www.svgrepo.com/show/427491/delivery-logistics-shipping.svg" alt="logo"/>
                        GDVSTA    
                    </a>
                    <div className="w-full bg-white rounded-lg shadow darks:border md:mt-0 sm:max-w-md xl:p-0 darks:bg-gray-800 darks:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl darks:text-white">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 darks:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darks:bg-gray-700 darks:border-gray-600 darks:placeholder-gray-400 darks:text-white darks:focus:ring-blue-500 darks:focus:border-blue-500" placeholder="name@company.com" required=""/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 darks:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darks:bg-gray-700 darks:border-gray-600 darks:placeholder-gray-400 darks:text-white darks:focus:ring-blue-500 darks:focus:border-blue-500" required=""/>
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 darks:text-white">Confirm password</label>
                                    <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 darks:bg-gray-700 darks:border-gray-600 darks:placeholder-gray-400 darks:text-white darks:focus:ring-blue-500 darks:focus:border-blue-500" required=""/>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 darks:bg-gray-700 darks:border-gray-600 darks:focus:ring-primary-600 darks:ring-offset-gray-800" required=""/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 darks:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline darks:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center darks:bg-primary-600 darks:hover:bg-primary-700 darks:focus:ring-primary-800">Create an account</button>
                                <p className="text-sm font-light text-gray-500 darks:text-gray-400">
                                    Already have an account? <Link to="/adminlogin" className="font-medium text-primary-600 hover:underline darks:text-primary-500">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                </section>
    </div>
  )
}

export default UserRegister