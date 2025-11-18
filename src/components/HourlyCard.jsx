import { weatherCodeImgMap } from "./weatherCodeImgMap.jsx";
import "./HourlyCard.css";

function HourlyCard({ item, index }) {
  return (
    <>
      <div key={index} className="hourly-report-card">
        <img
          className="hourly-report-icon"
          src={weatherCodeImgMap[item.code]}
          alt="weather icon"
        />
        <p className="hourly-report-time">{item.hour}</p>
        <p className="hourly-report-temp">{item.temp}°</p>
      </div>
    </>
  );
}

export default HourlyCard;
