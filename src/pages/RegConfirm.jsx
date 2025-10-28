import React, {useState, useContext, useEffect} from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const RegConfirm = () =>{
    const [headerMessage, setHeaderMessage] = useState("")
    const [contentMessage, setContentMessage] = useState('')

    const [searchParams] = useSearchParams(); 

    // Get the value of the 'username' key from the search parameters
    const username = searchParams.get('username');
    const status = searchParams.get('status')

    useEffect(() => {
        if (username&&status==="verifyemail") {
            setHeaderMessage("Verify Your Email! ");
            setContentMessage("Your account has been created successfully. Verify your email to continue.");
        } else if (username&&status==="emailverified"){
            setHeaderMessage("Email Verified! ");
            setContentMessage("Thank you for verifyinig your email. ");
        } else if (username&&status==='tokenExpired'){
            setHeaderMessage("Token Expired")
            setContentMessage("Your email verification token has expired. Please request for a new one.")
        } else {
            setHeaderMessage("Something went wrong!");
            setContentMessage("Please try registering again.");
        }
    }, [username]);

    return (
        <>
 
        <div className="flex flex-col items-center justify-top min-h-screen p-4 bg-gray-50 text-center">
          <div className="max-w-xl mx-auto pt-10 space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              {headerMessage}
            </h1>
            
            {username ? (
              <p className="text-lg text-gray-600">
                Hi, {username}, {contentMessage}
              </p>
            ): 
            (
                <p className="text-lg text-gray-600">
                 {contentMessage}
              </p>
            )}
      
            <div className="pt-4">
             
      
              <Link
                className="inline-block px-6 py-3 font-semibold text-white bg-tertiary rounded-lg hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-primary-300 transition-colors duration-200"
                to={
                  status === 'tokenExpired'
                    ? '/Resendverificationemail'
                    : username
                    ? '/adminlogin'
                    : '/adminregister'
                }
              >
                {status === 'tokenExpired' ? 'Re-send Verification Email' : username ? 'Log In' : 'Register'}
              </Link>
            </div>
          </div>
        </div>
      </>
    )
}

export default RegConfirm; 