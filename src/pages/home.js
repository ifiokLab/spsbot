import React, { useState,useEffect } from 'react';
import { Navigate, Link, useNavigate,useParams, useLocation } from 'react-router-dom'; // Import useLocation
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user-action'; // Import actions
import { useSelector } from 'react-redux';
import '../styles/header.css';
import '../styles/home.css';
import hero from '../images/banner.jpg';
import tradevideo from '../images/TradingView.mp4';
import hero2 from '../images/hero2.webp';
import Header from '../components/header';
import Footer from '../components/footer';
import apiUrl from '../components/api-url';

const Home = ()=>{
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    
    
    return(
        <>
          <Header />
          <div className='main-wrapper'>
              <div className='hero-wrapper'>
                      <img className = 'laptop-hero' src={hero} alt='images'/>
                      <img src={hero} className = 'mobile-hero' alt='images'/>
                      <div className='hero-text-wrapper'>
                          <h2>Where the world does markets</h2>
                          <p>The best trades require research, then commitment.</p>
                      </div>

              </div>
              <div className = "video-container">
                      <video  autoPlay loop src={tradevideo}></video>
                      <p>Join 50 million traders and investors taking the future into their own hands.</p>
              </div>
          </div>
          <Footer />
       </>
    )
};

export default Home;