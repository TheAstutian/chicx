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
import Product from "./pages/Product";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";

const Layout = () =>{
  return(
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export const API_URL = 'http://localhost:8800';

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
        path:'/products',
        element:<Products />
      },
      {
        path:'/products/:id',
        element:<Product />
      },
      {
        path:'/adminlogin',
        element: <AdminLogin />
      },
      {
        path:'adminregister',
        element:<AdminRegister />
      }
    ]
  }
])

function App() {
  return (
    <div className="App"> 
      <div className="">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
