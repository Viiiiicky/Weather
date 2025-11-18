import "./SubCard.css";

function SubCard({ label, value, units, type }) {
  const { speedUnit, heightUnit } = units;

  const unitSymbols = {
    temp: "°",
    humidity: "%",
    height: heightUnit === "mm" ? " mm" : " in",
    speed: speedUnit === "kmh" ? " km/h" : " mph",
  };

  return (
    <>
      <div className="sub-report-card" key={label}>
        <p className="sub-report-title">{label}</p>
        <p className="sub-report-data">
          {value}
          <span className="sub-report-unit">{unitSymbols[type] ?? ""}</span>
        </p>
      </div>
    </>
  );
}

export default SubCard;
