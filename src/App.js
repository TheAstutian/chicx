import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
} from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import './App.css';
import Products from "./pages/Products";
import About from "./pages/About";
import Product from "./pages/Product";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import NewProduct from "./pages/NewProduct";

const Layout = () =>{
  return(
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
} 

export const API_URL = process.env.REACT_APP_API_URL;


const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/about',
        element:<About />
      },
      { 
        path:'/products',
        element:<Products />
      },
      {
        path:'/products/:id',
        element:<Product />
      },
      
      {
        path:'/NewProduct',
        element:<NewProduct />
      }
    ]
  },
  
  {
    path:'/adminlogin',
    element: <AdminLogin />
  },
  {
    path:'adminregister',
    element:<AdminRegister />
  },
])

function App() {
  return (
    <div className="App"> 
      <div className=" scroll-smooth">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
