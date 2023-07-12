import logo from './logo.svg';
import './App.css';
import Gauge from './Components/Gauge';



function App() {
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
