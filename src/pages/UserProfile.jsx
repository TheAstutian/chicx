import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../ContextStore";
import EditUserProfile from "../components/EditUserProfile";


    {/* Helper Component for Detail Rows (Optional but good practice) */}
    const ProfileDetail = ({ label, value, isAddress }) => (
        <div className={isAddress ? 'space-y-1 mb-4' : 'space-y-1'}>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className={`text-base font-medium ${isAddress ? 'text-gray-700' : 'text-gray-900'}`}>{value}</p>
        </div>
    );

const UserProfile = () =>{
    const [showModal, setShowModal] = useState(false)
   // const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
//const [currentUser, setCurrentUser] = useState('')
    useEffect(()=>{
        //const user =   JSON.parse(localStorage.getItem('user'))
       // setCurrentUser(user)
    }, [showModal])

   

const {currentUser} = useContext(AuthContext)

    return (
        <>
        <div className="flex justify-center p-4 sm:p-8 bg-gray-50 min-h-screen">
  
  <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-6 sm:p-10 border border-gray-200">
    
    {/* Header and Edit Link */}
    <div className="flex justify-between items-start border-b pb-4 mb-6">
      <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
      <span 
        onClick= {(e)=>{
            e.preventDefault();
            setShowModal(true)
        }}
        className="text-secondary hover:text-tertiary cursor-pointer font-semibold transition duration-150 ease-in-out text-sm flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-5.042 2.766a1 1 0 00-1.414 1.414L10.586 16H8v-2.586l5.042-5.042 1.414 1.414-5.042 5.042L6 18v2h2l10-10-2.828-2.828-5.042 5.042z" />
        </svg>
        Edit Profile
      </span>
    </div>

    {/* User Details Section */}
    <div className="space-y-6">
        
      {/* Name (Most prominent) */}
      <div className="pb-4">
        <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
          {currentUser.name&&currentUser.name || <i className=" text-gray-300">N/A</i>}
        </h2>
      </div>

      {/* Contact Info (Grid Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
        
        <ProfileDetail label="Email Address" value={currentUser.email&&currentUser.email || <i className="text-sm text-gray-300">N/A</i>} />
        <ProfileDetail label="Phone Number" value={currentUser.phone&&currentUser.phone || <i className="text-sm text-gray-300">N/A</i>} />
        <ProfileDetail label="Preferred Order Fulfilment Method:" value={currentUser.delivery? 'Delivery' : 'Pick up' } />
      </div>

      {/* Address Info (Stacked Layout) */}
     {currentUser.delivery? <div className="pt-4 border-t border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Delivery Addresses</h3>
        
        <ProfileDetail label="Address 1" value={<i>{currentUser.address1&&currentUser.address1 }</i>|| <i className="text-sm text-gray-300">N/A</i>}  isAddress={true} />
        <ProfileDetail label="Address 2 (Optional)" value={<i>{currentUser.address2&&currentUser.address2}</i> || <i className="text-sm text-gray-300">N/A</i>} isAddress={true} />
      
      </div>
      : 
        <>
        <ProfileDetail label={<b className="text-black">Pick up address:</b>} value={<i className="text-sm text-gray-500">Diamond Estate, Fashola street, Ipaja, Lagos Nigeria.</i>}  isAddress={true} />
        </>}

    </div>

    {/* Navigation/Action Links */}
    <div className="pt-8 mt-6 border-t border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Actions</h3>
      <a 
        href="#" 
        className="w-full text-center inline-block py-3 px-6 bg-black text-white font-bold rounded-lg shadow-md hover:bg-tertiary transition duration-150 ease-in-out text-lg"
      >
        View Order History
      </a>
    </div>

  </div>
</div>

{
          showModal&& (
            <div className='fixed inset-0 w-full h-full bg-black bg-opacity-70 backdrop-blur-sm flex flex-col justify-center items-center z-50 overflow-y-auto p-4'>
           
            <EditUserProfile user={currentUser} modal={setShowModal} />
            </div>
          )
        }
        
        </>
    )
}

export default UserProfile; 