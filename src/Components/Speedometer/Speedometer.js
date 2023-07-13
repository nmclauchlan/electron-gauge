import './Speedometer.css';
import Gauge from '../Common/Gauge';
import React, { useEffect, useState } from 'react';

export default Speedometer

function Speedometer({ value }) {
    const [speed, setSpeed] = useState(0); 
    const maxSpeed = 100;
    
    useEffect(() => {
        if(window.api == null) {
          console.error('preload.js not loaded, is this running in electron?');
        } else {
          window.api.on('speed', (message) => {
            setSpeed(message);
          });
        }
      }, []);

    return (
        <div>
            <Gauge value={speed} maxValue={maxSpeed} label="knots"/>
      </div>
    );
  }
  