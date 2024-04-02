//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import TradingChart  from './pages/chart';
import TradingChartMT  from './pages/mt4-chart';
import TradingBotController  from './pages/bot';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chart" element={<TradingChart />} />
      <Route path="/metatrader" element={<TradingChartMT />} />
      <Route path="/bot" element={<TradingBotController />} />
     
    </Routes>

  </BrowserRouter>
  );
}

export default App;
