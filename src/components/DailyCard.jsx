import "./DailyCard.css";

function DailyCard({ item }) {
  return (
    <div className="daily-report-card">
      <p className="daily-report-title">{item.date}</p>
      <img className="daily-report-icon" src={item.icon} alt="weather icon" />
      <div className="daily-report-temp">
        <p className="daily-max-temp">{item.maxTemp}°</p>
        <p className="daily-min-temp">{item.minTemp}°</p>
      </div>
    </div>
  );
}

export default DailyCard;
