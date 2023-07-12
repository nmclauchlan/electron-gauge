import './Gauge.css';

export default Gauge


function Gauge({ value, label }) {
    return (
        <div>
            <h1>{value} / {label}</h1>
      </div>
    );
  }
  