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
