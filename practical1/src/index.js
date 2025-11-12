import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route}  from "react-router-dom"
import Home from './Home';
import Signup from './Shared/Signup';
import Signin from './Shared/Signin';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Search from './Product/Search';
import SingleProduct from './Product/SingleProduct';
import Cart from './Product/Cart';
import Addresses from './Address/Addresses';
import Login from './Shared/Login';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
         <Routes>
             <Route path='/' Component={Home}></Route>
             <Route path='/sign-up' Component={Signup}></Route>
             <Route path='/sign-in' Component={Signin}></Route>
             <Route path='/search-product' Component={Search}></Route>
             <Route path='/product/:productId' Component={SingleProduct}></Route>
             <Route path='/cart' Component={Cart}></Route>
             <Route path='/addresses' Component={Addresses}></Route>
             <Route path='/log-in' Component={Login}></Route>
            
         </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
