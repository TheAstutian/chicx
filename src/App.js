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

const Layout = () =>{
  return(
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

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
        path:'/product/:id',
        element:<Product />
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
