import "./pbiA.css";

function PbiA() {
  // Sample of a data for one week. Fully made up.
  const volumeData = [
    { date: "Mon", volume: 4800 }, // here an example is 4 sets × 12 reps × 100 lbs
    { date: "Tue", volume: 3600 },
    { date: "Wed", volume: 5200 },
    { date: "Thu", volume: 2500 },
    { date: "Fri", volume: 6000 },
    { date: "Sat", volume: 3000 },
    { date: "Sun", volume: 0 },
  ];
 const maxVolume = Math.max(...volumeData.map((item) => item.volume)); // I wanted to use (*) but (×) looks better

  return (
    <div className="volume-container">
      <header className="volume-header"> 
        <h1>Training Volume Overview</h1>
        <p>
          This page shows a simple bar chart for total training volume per day.
          Volume = sets × reps × weight. 
        </p>
         <p className="volume-note">
    Example: 4 sets × 12 reps × 100 lbs = 4800 volume for one exercise.
  </p>
      </header>

      <section className="volume-chart-section">
        <h2>Weekly Volume Trend</h2>

<div className="bar-chart">
{volumeData.map((item, index) => (
<div key={index} className="bar-row">
<span className="bar-label">{item.date}</span>

 <div className="bar-track">
  <div
    className="bar"
    style={{
      width:
maxVolume === 0
          ? "0%"
 : `${Math.round((item.volume / maxVolume) * 100)}%`,
    }}
  ></div>
</div>
<span className="bar-value">{item.volume} lbs</span>
</div>
))}
</div>
</section>
</div>
  );
}

export default PbiA;