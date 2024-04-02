import React, { useState } from 'react';
import axios from 'axios';

const TradingBotController = () => {
  const [socket, setSocket] = useState(null);

  const startBot = () => {
    // Send a POST request to start the trading bot
    axios.post('http://localhost:8000/trading-bot-control/', { action: 'start' })
      .then(response => {
        console.log(response.data.message);
        // Establish WebSocket connection if not already connected
        if (!socket) {
          const newSocket = new WebSocket('ws://localhost:8000/ws/trading-bot/');
          newSocket.onopen = () => {
            console.log('WebSocket connection established.');
          };
          newSocket.onmessage = (event) => {
            console.log('Message from server:', event.data);
            // Handle messages from the server
          };
          newSocket.onclose = () => {
            console.log('WebSocket connection closed.');
          };
          setSocket(newSocket);
        }
      })
      .catch(error => {
        console.error('Error starting the bot:', error);
      });
  };

  const stopBot = () => {
    // Send a POST request to stop the trading bot
    axios.post('http://localhost:8000/trading-bot-control/', { action: 'stop' })
      .then(response => {
        console.log(response.data.message);
        // Close WebSocket connection if open
        if (socket) {
          socket.close();
          setSocket(null);
        }
      })
      .catch(error => {
        console.error('Error stopping the bot:', error);
      });
  };

  return (
    <div>
      <button onClick={startBot}>Start Bot</button>
      <button onClick={stopBot}>Stop Bot</button>
    </div>
  );
};

export default TradingBotController;
