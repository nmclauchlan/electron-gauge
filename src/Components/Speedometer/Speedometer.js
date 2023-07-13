import './Speedometer.css';
import Gauge from '../Common/Gauge';
import React, { useEffect, useState, useRef } from 'react';

export default Speedometer

function Speedometer() {
  const maxSpeed = 100;
    const [speed, setSpeed] = useState(0); 
    const [messagesPerSecond, setMessagesPerSecond] = useState(0);
    const messageCountRef = useRef(0);
    
    useEffect(() => {
        if(window.api == null) {
          console.error('preload.js not loaded, is this running in electron?');
        } else {
          window.api.on('speed', (message) => { 
            if (message == null) {
            console.warn('Null speed received, ignoring.')
            }  else {
              setSpeed(message);
              messageCountRef.current += 1;
            }
          });
        }
      }, []);

      useEffect(() => {
        const messageCounter = setInterval(() => {
            setMessagesPerSecond(messageCountRef.current);
            messageCountRef.current = 0;
        }, 1000);

        return () => clearInterval(messageCounter);
    }, []);

    return (
        <div>
            <Gauge value={speed} maxValue={maxSpeed} label="knots"/>
            <div className="metric">Updates per second: {messagesPerSecond}</div>
            <div className="description">
                The Speedometer above displays the current speed in knots. <br/>
                It has a maximum speed of {maxSpeed} knots. <br/>
                This is populated by the 1st data point in in the data output on UDP port 3000 by MockDataServer. <br/>
                For demonstrating this application, MockDataServer will randomly add or subtract 1 to the current speed every update. 
            </div>
      </div>
    );
  }
  