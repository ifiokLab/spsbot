import React, { useState,useEffect } from 'react';
import { Navigate, Link, useNavigate,useParams, useLocation } from 'react-router-dom'; // Import useLocation
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user-action'; // Import actions
import { useSelector } from 'react-redux';
import '../styles/header.css';
import '../styles/home.css';
import hero from '../images/hero.webp';
import tradevideo from '../images/TradingView.mp4';
import hero2 from '../images/hero2.webp';
import Header from '../components/header';
import Footer from '../components/footer';
import apiUrl from '../components/api-url';

const Home = ()=>{
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    useEffect(() => {
        console.log('socket:');
        const socket = new WebSocket('ws://localhost:8000/ws/long-running-task/');
        
    
        socket.onopen = function(event) {
          console.log('WebSocket connection established.');
          // Send a message to start the long-running task
          socket.send('start');
        };
    
        socket.onmessage = function(event) {
          console.log('Message from server:', event.data);
          // Handle messages from the server, such as task updates or completion
        };
    
        socket.onclose = function(event) {
          console.log('WebSocket connection closed.');
        };
    
        return () => {
          socket.close();
        };
      }, []);
    
    return(
       <>
            <Header />
            <div className='main-wrapper'>
                <div className='hero-wrapper'>
                        <img className = 'laptop-hero' src={hero} alt='images'/>
                        <img src={hero2} className = 'mobile-hero' alt='images'/>
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