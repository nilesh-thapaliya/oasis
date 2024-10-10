import React from "react";
import Login from "./Components/Forms/Login";
import Register from "./Components/Forms/Register";
import Forgot from "./Components/Forms/Forgot";
import Homepage from "./Components/Homepage/Homepage";
import Navbar from "./Components/Navbar/Navbar";
import OpenFtop from "./Components/OpenFtop/OpenFtop";
import Footer from "./Components/Footer/Footer";
import Products from "./Components/Products/Products";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyContextProvider from "./Common/Context/MyContextProvider";
import Overview from "./Components/Overview/Overview";
import Gototop from "./Components/Gototopbtn/Gototop";
import Cart2 from "./Components/Cart/Cart2";
import Categories from "./Components/Categories/Categories";
import HomeProduct from "./Components/Products/Homeproduct";
import Checkout from "./Components/Checkout/Checkout";
import Payment from "./Components/Payment/Payment";
import Confirm from "./Components/Confirm/Confirm";
import Blog from "./Components/Blog/Blog";
import Accountdetails from "./Components/Accountdetails/Accountdetails";
import Userprofile from "./Components/Userprofile/Userprofile";

import Snackbarcom from "./Components/Snackbar/Snackbar";
import Orderdetails from "./Components/Orderdetails/Orderdetails";
import Admin from "./Components/Admin/Admin";
import Resetpass from "./Components/Forms/Resetpass";





function App() {
  return (
    <div className="App">

      <BrowserRouter>

      <MyContextProvider>

          <Navbar />
          <Login/>
          <Register/>
          <Forgot/>    
          
          <OpenFtop/>
          <Gototop/>

          <Cart2/>
          <Checkout/>   
          <Payment/>
          <Confirm/>
          <Snackbarcom/>
          <Userprofile/>    
          <Orderdetails/>    
          
          <Routes>
              <Route index element={<Homepage />} />
              <Route path="/category/:products" element={<Products />} />
              <Route path="/categories" element={<Categories />} />
              <Route path='/:category/:products' element={<Overview />} />
              <Route path='/all' element={<HomeProduct />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/account-detail' element={<Accountdetails />} />
              <Route path='/admin-page' element={<Admin />} />
              <Route path='/forgot-password' element={<Resetpass />} />

          </Routes>
          
          <Footer />

      </MyContextProvider>
    
      </BrowserRouter>






    </div>
  );
}

export default App;


