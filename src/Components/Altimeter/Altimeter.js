import './Altimeter.css';
import Gauge from '../Common/Gauge';
import React, { useEffect, useState, useRef } from 'react';

export default Altimeter

function Altimeter() {
    const maxAltitude = 200;
    const [altitude, setAltitude] = useState(0);
    const [messagesPerSecond, setMessagesPerSecond] = useState(0);
    const messageCountRef = useRef(0);

    useEffect(() => {
        if(window.api == null) {
          console.error('preload.js not loaded, is this running in electron?');
        } else {
            window.api.on('altitude', (message) => {
            if (message == null) {
                console.warn('Null altitude received, ignoring.')
            } else {
                setAltitude(message);
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
            <Gauge value={altitude} maxValue={maxAltitude} label="feet"/>
            <div className="metric">Updates per second: {messagesPerSecond}</div>
            <div className="description">
                The Altimeter above displays the current altitude in feet. <br/>
                It has a maximum altitude of {maxAltitude} feet. <br/>
                This is populated by the 2nd data point in in the data output on UDP port 3000 by MockDataServer. <br/>
                For demonstrating this application, MockDataServer will randomly add or subtract 1 to the current altitude every update. 
            </div>
      </div>
    );
  }
  