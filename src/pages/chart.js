import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import Header from '../components/header';
import Footer from '../components/footer';
import apiUrl from '../components/api-url';
import '../styles/chart.css';


const TradingChart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState("EURJPY-OTC"); // Default currency
  const [socket, setSocket] = useState(null);
  const [botModal, setBotModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [broker,setBroker] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarStatus, setsnackbarStatus] = useState('');
  const [isOn, setIsOn] = useState(true);
 


  
  const toggleButton = async(event) => {
    setIsOn(!isOn);
    console.log('isOn:',isOn, setIsOn(!isOn));
    if(isOn){
      console.log('on..');
      event.preventDefault();
      setIsLoading(!isLoading);
     
      setShowSnackbar(false);
      const response = axios.post(`${apiUrl}/trading-bot-control/`, { action: 'start' ,email:email,password:password,broker:broker,currency:currency});
      console.log('response.data.',response.data);
      
      setTimeout(() => {
        setShowSnackbar(!showSnackbar);
        setsnackbarStatus('success');
        setShowSnackbar(true);
      
      }, 5000);
      
      try{
        if(response.data.success){
            
          console.log(response.data.message);
          // Establish WebSocket connection if not already connected
          if (!socket) {
            const newSocket = new WebSocket(`ws://${apiUrl}/ws/trading-bot/`);
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
        }
      } catch(error){
        console.error('Error starting the bot:', error);
      };
    }else{
      console.log('off..');
      setShowSnackbar(true);
      setTimeout(() => {
        
        setsnackbarStatus('off');
        setShowSnackbar(true);
      
      }, 5000);
      axios.post(`${apiUrl}/trading-bot-control/`, { action: 'stop' })
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
    }
  };


  const ToggleBot = (event)=>{
    event.preventDefault();
    setBotModal(!botModal);
  };
  const Pocket = async () => {
      try {
        
          const response = await axios.post(`${apiUrl}/api/pocket/`, {
          email:'email',
          password:'password',
          });

          if (response) {
            console.log('repsonse:',response.data.message);
          } else {
              console.error('error:',response.data.errors);
            
          
          // Handle failed signup, e.g., show error messages to the user
          }
      } catch (error) {
        console.error('error:',error);
          // Handle unexpected errors
      }
     
  };
  

  

  useEffect(() => {
    fetchData(); // Fetch data initially when component mounts

    const intervalId = setInterval(fetchData, 900000); // Fetch data every 60 seconds (adjust as needed)

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [currency]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/trading-data/`, {
        params: { symbol: currency, timeframe: 60, count: 100 }
      });
      setData(response.data);
      setError(null); // Reset error if fetching succeeds
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data'); // Set error message
    }
  };

  const series = [{
    data: data.map(item => ({
      x: new Date(item.Date).getTime(),
      y: [item.Open, item.High, item.Low, item.Close]
    }))
  }];

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
      background: '#1e1e1e', // Dark background color
      foreColor: '#ffffff', // Text color
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        },
        autoSelected: 'zoom'
      },
      events: {
        dataPointMouseEnter: function (event, chartContext, config) {
          console.log("Mouse enter:", config.seriesIndex, config.dataPointIndex);
        },
        dataPointMouseLeave: function (event, chartContext, config) {
          console.log("Mouse leave:", config.seriesIndex, config.dataPointIndex);
        },
        markerClick: function (event, chartContext, { seriesIndex, dataPointIndex }) {
          console.log("Marker click:", seriesIndex, dataPointIndex);
        }
      }
    },
    title: {
      text: `${currency} Chart`,
      align: 'center'
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        formatter: function (value) {
          return value.toFixed(5); // Adjust decimal places as needed
        }
      }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#90EE90',
          downward: '#FF0000'
        },
        
      }
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy HH:mm'
      }
    },
    stroke: {
      show: true,
      colors: '#F2F2F2'
    }
  };
  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value); // Update selected currency
  };

  return (
    <>
     <Header />
     <div className='main-wrapper' id='chart-main-wrapper'>
      <div className='bot-control-wrapper'>
        <div className="App">
        <button
          className={`toggle-button ${isOn ? 'off' : 'on'}`}
          onClick={toggleButton}
        >
          {isOn ? 'OFF' : 'ON'}
        </button>
      </div>
        <button onClick={ToggleBot} >Set Bot</button>
        <div>
         
        <select id="currency" value={currency} onChange={handleCurrencyChange}>
          <option value="">Select currency</option>
          <option value="EURJPY-OTC">EURJPY-OTC</option>
          <option value="EURUSD-OTC">EURUSD-OTC</option>
          <option value="USDCHF-OTC">USDCHF-OTC</option>
          <option value="GBPUSD-OTC">GBPUSD-OTC</option>
          <option value="AUDCAD-OTC">AUDCAD-OTC</option>
          <option value="NZDUSD-OTC">NZDUSD-OTC</option>
          <option value="EURGBP-OTC">EURGBP-OTC</option>
        </select>
        </div>
      </div>
      
      {error ? (
          <p>{error}</p>
        ) : (
          <Chart options={options} series={series} type="candlestick" height={350} />
        )}
      
        
     </div>
      <Footer />
      <form className={`organization-form ${botModal ? 'show' : ''}`} onSubmit={ToggleBot}>
                <div className='form-wrapper'>
                    <div className='form-headerx'>
                        <div className='title'>Set Bot</div>
                        <div className='icon' onClick={ToggleBot}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group ${currency ? 'active' : ''}`}>
                        <select id="currency" value={currency} onChange={handleCurrencyChange}>
                          <option value="">Select currency</option>
                          <option value="EURJPY-OTC">EURJPY-OTC</option>
                          <option value="EURUSD-OTC">EURUSD-OTC</option>
                          <option value="USDCHF-OTC">USDCHF-OTC</option>
                          <option value="GBPUSD-OTC">GBPUSD-OTC</option>
                          <option value="AUDCAD-OTC">AUDCAD-OTC</option>
                          <option value="NZDUSD-OTC">NZDUSD-OTC</option>
                          <option value="EURGBP-OTC">EURGBP-OTC</option>
                        </select>
                        </div>
                        <div className={`form-group ${broker ? 'active' : ''}`}>
                            <select value={broker} onChange={(e) => setBroker(e.target.value)} required>
                                <option value="">Select Broker</option>
                                <option value="iqoption">IQ OPTION</option>
                                <option value="pocketoption">POCKET OPTION</option>
                               
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div className={`form-group ${email ? 'active' : ''}`}>
                            <input type="email" id="email" value={email} onChange = {(event)=>setEmail(event.target.value)} required />
                            <label htmlFor="email">email</label>
                        </div>
                        <div className={`form-group ${password ? 'active' : ''}`}>
                            <input type="password" id="password" value={password} onChange = {(event)=>setPassword(event.target.value)} required />
                            <label htmlFor="password">Password</label>
                        </div>
                       
                       

                        <div className='btn-wrapper'>
                            <button type="submit">
                              Set Bot
                            {isLoading ? <div className="loader"></div> : '' }
                                
                                    
                            </button>
                        </div>
                    </div>
                </div>
      </form>
            {showSnackbar && (
                <div className={` ${snackbarStatus==='success' ? 'snackbar-success' :'snackbar-danger'} `}>
                    {snackbarStatus === 'success' ? (
                        <>
                            <i class="fa-solid fa-circle-check"></i>
                            success!
                        </>
                    ):
                    (
                        <>
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            fail!
                        </>
                    )
                }
                    
                </div>
            )}
    </>
  );
};

export default TradingChart;