import './Altimeter.css';
import Gauge from '../Common/Gauge';
import React, { useEffect, useState } from 'react';

export default Altimeter

function Altimeter({ value }) {
    const [altitude, setAltitude] = useState(0);
    const maxAltitude = 200;

    useEffect(() => {
        if(window.api == null) {
          console.error('preload.js not loaded, is this running in electron?');
        } else {
          window.api.on('altitude', (message) => {
            setAltitude(message);
          });
        }
      }, []);

    return (
        <div>
            <Gauge value={altitude} maxValue={maxAltitude} label="feet"/>
      </div>
    );
  }
  