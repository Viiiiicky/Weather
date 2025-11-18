import dateFormatter from "./dateFormatter.js";
import DailyCard from "./DailyCard.jsx";
import { weatherCodeImgMap } from "./weatherCodeImgMap.jsx";
import "./DailyReport.css";

function DailyReport({ daily }) {
  const { temperature_2m_max, temperature_2m_min, time, weather_code } = daily;

  const dailyList = time.map((originalTime, index) => {
    return {
      date: dateFormatter(originalTime, "weekday"),
      maxTemp: temperature_2m_max[index],
      minTemp: temperature_2m_min[index],
      icon: weatherCodeImgMap[weather_code[index]],
    };
  });

  return (
    <>
      <section className="daily-report-section">
        <div className="daily-report-title">
          <p className="report-title">每日預報</p>
        </div>
        <div className="daily-report-content">
          {dailyList.map((item, index) => {
            return (
              <>
                <DailyCard key={item.date} item={item} index={index} />
              </>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default DailyReport;
