import axios from "axios";
import { useState } from "react";
import { API_URL } from "../App";
import { useNavigate } from "react-router-dom";


const CheckoutModal = (props) =>{

    window.scrollTo(0,0)
    const {cartItems, total, userDetails, showModal, setShowModal } = props;  
    //recieve buyer information and goods information. 
    // And then send data to backend. 
    const [order, setOrder] = useState({
        userDetails: userDetails,
        cart: cartItems,
        total: total, 
    })
     const navigate = useNavigate();

    const placeOrder = async ()=>{

        // send order data to backend 
        //return with yes or no alert, then redirect to user page or homepage
        try{
            const orderPlaced = await axios.post(`${API_URL}/order`, {order})
           
            if (orderPlaced) {
                alert('Order Placed')
                navigate('/products')
            }

        }catch (err){
            console.log(err)
        }
        //console.log(order)
    }

    return (
        <>    
                        <div className=" w-full md:min-w-92 md:w-1/2 px-2 md:px-10 md:px-1 md:mx-auto">
                        <div className="flex flex-col p-6 space-y-4 divide-y mx-2 md:mx-10 sm:mx-1 sm:w-92 sm:p-10 divide-gray-700 bg-gray-100 text-gray-900">
                <h2 className="text-2xl font-semibold">Order Details</h2>
                <ul className="flex flex-col pt-4 space-y-2">
                    {
                        cartItems.map((item)=>(
                        <li className="flex items-start justify-between">
                        <h3>{item.name}
                            <span className="text-sm text-primary"> x{item.quantity}</span>
                        </h3>
                        <div className="text-right">
                            <span className="block">₦{item.sellingPrice * item.quantity} </span>
                            <span className="text-sm text-gray-400">at ₦{item.sellingPrice}</span>
                        </div>
                    </li>
                        ))
                    }
                </ul>
                <div className="pt-4 space-y-2">
                    <div>
                        <div className="flex justify-between">
                            <span>Total</span>
                            <span className="font-semibold">₦{total}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-3 h-3 mt-1 fill-current text-violet-400">
                                <path d="M485.887,263.261,248,25.373A31.791,31.791,0,0,0,225.373,16H64A48.055,48.055,0,0,0,16,64V225.078A32.115,32.115,0,0,0,26.091,248.4L279.152,486.125a23.815,23.815,0,0,0,16.41,6.51q.447,0,.9-.017a23.828,23.828,0,0,0,16.79-7.734L486.581,296.479A23.941,23.941,0,0,0,485.887,263.261ZM295.171,457.269,48,225.078V64A16.019,16.019,0,0,1,64,48H225.373L457.834,280.462Z"></path>
                                <path d="M148,96a52,52,0,1,0,52,52A52.059,52.059,0,0,0,148,96Zm0,72a20,20,0,1,1,20-20A20.023,20.023,0,0,1,148,168Z"></path>
                            </svg>
                            <span className="text-gray-400">Spend ₦200,000.00, get 10% off</span>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span>₦0.00</span>
                    </div>
                </div>
                <div className="pt-4 space-y-2">
                    <div className="flex justify-between ">
                        <span><b>Customer Details:</b></span>
                        <span> </span>
                    </div>
                    <div className="flex flex-col space-y-1 pb-5">
                        <div className="flex justify-between">
                            <span>{userDetails.name&&userDetails.name}</span>
                            <span> </span>
                        </div>
                        <div className="flex justify-between">
                            <span>{userDetails.email&&userDetails.email}</span>
                            <span></span>
                        </div>
                        <div className="flex justify-between">
                            <span>{userDetails.phone&&userDetails.phone}</span>
                            <span></span>
                        </div>
                        <div className="flex flex-col justify-between">
                            <b><span >{userDetails.delivery? 'Deliver to:': 'Pickup at:'}</span></b>
                            <span>{userDetails.delivery? userDetails.address1 : 'Diamond Estate, Fashola street, Ipaja, Lagos Nigeria'}</span>
                        </div>
                        
                        <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-primary">How do our fees work?</a>
                    </div>

                    <div className="space-y-6">
                        <div className="flex space-x-5 px-3 justify-between">
                        {<button onClick={()=>setShowModal(false)} type="button" className="w-1/2 md:w-full py-2 font-semibold border rounded bg-gray-100 text-gray-900 border-tertiary hover:bg-gray-200">Back</button>}
                        <button onClick={placeOrder} type="button" className="w-1/2 md:w-full py-2 font-semibold border rounded bg-tertiary text-gray-100 border-gray-100 hover:bg-secondary ">Confirm Order </button>     
                        </div>
                        
                    </div>
                </div>
            </div>
            </div>
    
        </>
    )
}

export default CheckoutModal; 