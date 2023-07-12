import logo from './logo.svg';
import './App.css';
import Gauge from './Components/Gauge';
import React, { useEffect } from 'react';

function App() {

  
  useEffect(() => {
    window.api.on('udp message', (message) => {
      console.log('Received UDP message: ', message);
      // Use the message to update state
    });
  }, []);
  return (
    <div className="App">
        <div>
          <Gauge value="10" label="knots"/>
        </div>
        <div>
          <Gauge value="10" label="altitude"/>
        </div>
    </div>
  );
}

export default App;
