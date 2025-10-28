import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { API_URL } from "./App";

export const AuthContext = createContext();

// Auth Context Provider
export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
    
    const login = async (inputs)=>{
        const res = await axios.post(`${API_URL}/auth/admin-login`, inputs)
        
        setCurrentUser(res.data)
    }

    const updateUserDetails = async (email,inputs) =>{
        const updateProfile = await axios.patch(`${API_URL}/user/update/${email}`, {inputs})
        const updatedUser = updateProfile.data.data
        setCurrentUser(updatedUser)
//        return updatedUser; 
    }

    const logout = async(inputs)=>{
        setCurrentUser(null)
        
    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{currentUser, updateUserDetails, login, logout}}>{children}</AuthContext.Provider>
    )
}

// Cart Context Provider

export const CartContext = createContext();

export const CartProvider =({children})=>{
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || [] )
    const [cartItemsTotal, setCartItemsTotal]= useState(0)

    const addToCart =(item)=>{
        const isItemInCart = cartItems.find((cartItem)=> cartItem._id===item._id)

        if(isItemInCart){
            setCartItems(
                cartItems.map((cartItem)=>
                cartItem._id===item._id
            ?{...cartItem, quantity:cartItem.quantity+1}
        : cartItem)
            )
        } else {
            setCartItems([...cartItems, {...item, quantity:1}])
        }
    }

    const deleteFromCart = (item)=>{
        const isItemInCart = cartItems.find((cartItem)=>cartItem._id===item._id)
        if(isItemInCart){
            setCartItems(cartItems.filter((cartItem)=>cartItem._id!==item._id))
        }
    }

    const setItemQuantity =(item, quantity) =>{
        const isItemInCart = cartItems.find((cartItem)=>cartItem._id===item._id)

        if(isItemInCart){
            setCartItems(
                cartItems.map((cartItem)=>
                    cartItem._id===item.id?
                {...cartItem, quantity:quantity} 
                : cartItem
                )
            )
        }
    }

    const removeFromCart = (item)=>{
        const isItemInCart = cartItems.find((cartItem)=>cartItem._id===item._id)

        if(isItemInCart.quantity===1){
            setCartItems(cartItems.filter((cartItem)=>cartItem._id!==item._id))
        } else{
            setCartItems(
                cartItems.map((cartItem)=>
                    cartItem._id===item._id
                    ?{...cartItem, quantity: cartItem.quantity-1}
                    :cartItem
                )
            )
        }
    }

    const clearCart = ()=>{
        setCartItems([])
    }

    const getCartTotal =()=>{
       
       if (cartItems.length>0) {
       return cartItems.reduce((total,item) => total+item.sellingPrice*item.quantity,0)
        }
    
    }

    useEffect(()=>{
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        
          setCartItemsTotal(getCartTotal());
    },[cartItems])

    return (
        <CartContext.Provider value={{cartItems,addToCart,removeFromCart,clearCart, deleteFromCart, cartItemsTotal}}>{children}</CartContext.Provider>
    )
}

export const AppProvider=({children})=>{
    return(
        <AuthContextProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </AuthContextProvider>
    )
}