import './App.css';
import { Routes, Route } from 'react-router-dom';

import Altimeter from './Components/Altimeter/Altimeter';
import Speedometer from './Components/Speedometer/Speedometer';

function App() {

  return (
    <div className="App">
       <Routes>
          <Route path="/" />
          <Route path="/speedometer" element={<Speedometer />} />
          <Route path="/altimeter" element={<Altimeter />} />
       </Routes>
    </div>
  );
}

export default App;
