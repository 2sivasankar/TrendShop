import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import {useState} from 'react';
import LoginPage from './pages/LoginPage';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import PostingAd from './pages/PostingAd';
import Category from './pages/Category';
import Logout from './pages/Logout';
import AllAdsPage from './pages/AllAdsPage';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
function App(){
      const [showTimer,setshowTime]=useState(true);
      
  return(
    <>
    <div>
        <button onClick={()=>setshowTime(!showTimer)}>
          {showTimer ?"hide timer":"show timer"};
        </button>
        {showTimer && <Category />}
    </div>
  
  <Router>
    <Navbar />
    <Routes> 
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={< Register />}/>
      <Route path="/post" element={< PostingAd />} />
      <Route path="/category" element={<Category />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/allads" element={<AllAdsPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />


    </Routes>
    <Footer />
  </Router>
  </>
  );
}
export default App