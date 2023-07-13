import './App.css';
import React, { useEffect, useState } from 'react';

import Gauge from './Components/Gauge';
import ProcessMessage from './Api/ProcessMessage';

function App() {
  const [knots, setKnots] = useState(0);
  const [altitude, setAltitude] = useState(0);

  useEffect(() => {
    if(window.api == null) {
      console.error('preload.js not loaded, is this running in electron?');
    } else {
      window.api.on('udp message', (message) => {
        var packet = ProcessMessage(message);
        console.log('Received UDP message: ', packet);
        setKnots(packet.knots);
        setAltitude(packet.altitude);
      });
    }
  }, []);
  return (
    <div className="App">
        <div>
          <Gauge value={knots} label="knots"/>
        </div>
        <div>
          <Gauge value={altitude} label="altitude"/>
        </div>
    </div>
  );
}

export default App;
