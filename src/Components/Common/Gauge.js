import './Gauge.css';

export default Gauge

function Gauge({ value, maxValue, label }) {
  const radius = 100;
    return (
        <div>
          <svg height={200} width={(radius * 2) + 10}>
            <path d="M5,110 a100,100 0 0,1 200, 0"
            stroke="#000"
            strokeWidth="7" />
            <path d="M5,110 a100,100 0 0,1 200, 0" fill="#EEE2DE" 
            stroke="#000" stroke-dasharray="5 1"
            strokeWidth="7" />‍
          </svg>
          <div class="indicator" style={
            { transform: 'rotate(' + (value / maxValue) * 180 + 'deg)'}
            }></div>
          <div class="label">{value} / {label}</div>
      </div>
    );
  }
  