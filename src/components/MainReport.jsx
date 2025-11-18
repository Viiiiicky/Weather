import dateFormatter from "./dateFormatter.js";
import { weatherCodeImgMap } from "./weatherCodeImgMap.jsx";
import "./MainReport.css";

function MainReport({ current, location }) {
  const {
    temperature_2m: temp = "N/A",
    time: time = "N/A",
    weather_code: code = "N/A",
  } = current;

  const { name, country } = location;

  const formatDate = dateFormatter(time, "month/day(weekday)");

  return (
    <>
      <section className="main-report-section">
        <div className="main-report-geoInfo">
          <p className="main-report-name">{`${name}, ${country}`}</p>
          <p>{formatDate}</p>
        </div>
        <div className="main-report-icon">
          <img
            src={weatherCodeImgMap[code]}
            className="main-report-image"
            alt="weather icon"
          />
        </div>
        <div className="main-report-temp">
          <p>{temp}°</p>
        </div>
      </section>
    </>
  );
}

export default MainReport;
