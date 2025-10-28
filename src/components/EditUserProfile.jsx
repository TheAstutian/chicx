import axios from "axios";
import { useContext, useState } from "react";
import { API_URL } from "../App";
import { AuthContext } from "../ContextStore";

 
const FormField = ({ label, name, type, id, value, placeholder, disabled = false, onChange, error }) => (
    <div className="flex flex-col space-y-1">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            className={`w-full p-3 border placeholder:italic placeholder:text-sm rounded-lg focus:ring-2 focus:ring-blue-500 transition 
                        ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'}`}
        />
        <span className="text-red-500 text-xs">{error}</span>
    </div>
);

 
const ToggleField = ({ label, name, checked, onChange }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <span className="text-xs text-gray-500">
                Current Preference: <span className="font-semibold">{checked ? 'Delivery' : 'Pickup'}</span>
            </span>
        </div>
        
        {/* Toggle Switch UI */}
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            // Ensure the value passed back is the new checked state (which is !checked)
            onClick={() => onChange({ target: { name, value: !checked, type: 'checkbox' } })}
            className={`${checked ? 'bg-tertiary' : 'bg-gray-200'}
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out
            `}
        >
            <span
                aria-hidden="true"
                className={`${checked ? 'translate-x-5' : 'translate-x-0'}
                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                `}
            />
        </button>
    </div>
);


const EditUserProfile = (props) =>{


 const {user, modal: closeModal} = props;
 const {updateUserDetails} = useContext(AuthContext) 
 
 const [inputs, setInputs] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    delivery: user?.delivery ?? false,  
    address1: user?.address1 || "",
    address2: user?.address2 ||""   
});
const [error, setError] = useState({
    nameError: '',
    phoneError: '',
    address1Error:'',
    address2Error:'',
})

    const handleChange = e =>{
        const { name, value, type } = e.target;
        
        // Determine the correct value for the state update
        const newValue = type === 'checkbox' ? value : value;

        setInputs(prev=>({...prev, [name]: newValue}))
       
        setError(prev => ({ ...prev, [`${name}Error`]: '' }));
    }

    const validate = () => {
        let isValid = true;
        const newErrors = { 
            nameError: '', 
            phoneError: '', 
            address1Error: '', 
            address2Error: '' 
        };

        // Name Validation
        const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
        if (!inputs.name.trim()) {
            newErrors.nameError = "Full Name is required.";
            isValid = false;
        } else if (!nameRegex.test(inputs.name)) {
            newErrors.nameError = "Name must contain 2-50 characters (letters, spaces, hyphens, apostrophes only).";
            isValid = false;
        }

        // Phone Validation
        const phoneRegex = /^\+?[\d\s\(\)-]{7,15}$/;
        if (!inputs.phone.trim()) {
            newErrors.phoneError = "Phone Number is required.";
            isValid = false;
        } else if (!phoneRegex.test(inputs.phone.trim())) {
            newErrors.phoneError = "Invalid phone format. Use 7-15 characters (digits, +, spaces, -, ()).";
            isValid = false;
        }

        // Address Validation - ONLY apply if delivery is TRUE
        const addressRegex = /^[a-zA-Z0-9\s.,'#/-]{5,100}$/;
        
        if (inputs.delivery) { // New: Only validate address if delivery is true
            if (!inputs.address1.trim()) {
                newErrors.address1Error = "Address 1 is required for delivery.";
                isValid = false;
            } else if (!addressRegex.test(inputs.address1.trim())) {
                newErrors.address1Error = "Invalid address format or too short/long (5-100 chars).";
                isValid = false;
            }
            
            if (inputs.address2.trim() && !addressRegex.test(inputs.address2.trim())) {
                newErrors.address2Error = "Invalid address format or too short/long (5-100 chars).";
                isValid = false;
            }
        }


        setError(newErrors);
        return isValid;
    };


    const onSubmit = async (e) =>{
        e.preventDefault();
        // IMPORTANT: Validate only before submission
        if (validate()) { 
            // Validation passed! 
            try{
               
                updateUserDetails(user.email, inputs)
                closeModal(false)
                 
            } catch(err){
                console.log(err)
            }
           
          
       } else {
            console.log("Validation failed. Displaying errors.");
       }
        
    }

    return (
        <>
      <div className="flex justify-center p-4 sm:p-8 min-h-screen">
  <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-6 sm:p-10 border border-gray-200">
    
    {/* Header and Back Link */}
    <div className="border-b pb-4 mb-6">
      <span 
        onClick={(e)=>{
            e.preventDefault();
            closeModal(false)
            }}   
        className="text-gray-500 cursor-pointer hover:text-gray-700 transition duration-150 ease-in-out text-sm flex items-center mb-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to Profile
      </span>
      <h1 className="text-3xl font-bold text-gray-800">Edit Your Details</h1>
    </div>

    {/* Edit Form */}
    <form className="space-y-3">
      
      {/* 1. Personal Information Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Information</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <FormField label="Full Name" error={error.nameError} type="text" value={inputs.name} onChange={handleChange} name="name" id="name"  placeholder="Enter your full name"  />
          <FormField label="Email Address" type="email" id="email" value={user.email} disabled={true} />
          <FormField label="Phone Number" error={error.phoneError} type="tel" name="phone" value={inputs.phone}  onChange={handleChange} id="phone" placeholder="Enter your phone number" />
          
        </div>
      </div>

      {/* 2. Fulfillment Preference (NEW) */}
      <div className="space-y-2 pt-2">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Fulfillment Preference</h2>
          
          <ToggleField
              label="Opt for Delivery (vs. Pickup)"
              name="delivery"
              checked={inputs.delivery}
              onChange={handleChange}
          />

      </div>
      
      {/* 3. Address Information Section - Conditional Rendering Applied HERE */}
      {inputs.delivery && ( // The section only renders if inputs.delivery is TRUE
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Delivery Addresses</h2>
          
          <FormField label="Address 1" error={error.address1Error} onChange={handleChange} type="text" id="address1" name="address1" placeholder="123 Main St, Apt 4B, Anytown, CA 90210" value={inputs.address1}  />
          <FormField label="Address 2 (Optional)" error={error.address2Error} onChange={handleChange} type="text" name="address2" id="address2" placeholder="P.O. Box 789, Cityname, ST 01010" value={inputs.address2} />
          
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
        
        <button 
          type="button" // Use type="button" to prevent form submission
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition"
          onClick={(e)=>{
            e.preventDefault();
            closeModal(false)
            }}   
        >
          Cancel
        </button>
        
        <button 
          type="submit" 
          onClick={onSubmit}
          className="px-6 py-2 bg-tertiary text-white font-semibold rounded-lg hover:bg-primary shadow-md transition"
        >
          Save Changes
        </button>
      </div>

    </form>
    
  </div>
</div>


        </>
    )
}


export default EditUserProfile;


