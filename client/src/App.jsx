import { useState } from 'react'

import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';

import './App.css'
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Forgot from './components/Forgot';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import OtpForm from './components/OtpForm';
import ProductDetails from './components/ProductDetails';
import Admin from './admin/Admin';
import CartPage from './components/CartPage';
import BuyNowPage from './components/BuyNow';
import OrderSummaryPage from './components/OrderSummaryPage';
import ProductList from './components/ProductList';
import ContactUs from './components/ContactUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import About from './components/About';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/otp-form/:email' element={<OtpForm />} />
          <Route path='/reset-password-form' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          {/* <Route path='/add-product' element={<AddProduct />} />
          <Route path='/get-products' element={<ProductList />} /> */}
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/buynow/:id" element={<BuyNowPage />} />
          <Route path="/order-summary" element={<OrderSummaryPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/about" element={<About />} />




        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
