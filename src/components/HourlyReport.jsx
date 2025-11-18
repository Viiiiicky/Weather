import { useState } from "react";
import "./HourlyReport.css";
import HourlyCard from "./HourlyCard.jsx";
import HourlyDropdown from "./HourlyDropdown.jsx";
import useHourlyData from "./useHourlyData.js";

function HourlyReport({ hourly }) {
  const [selectedDate, setSelectedDate] = useState("");
  const { data, dataOptions } = useHourlyData(hourly);

  return (
    <>
      <section className="hourly-report-section">
        <div className="hourly-report-nav">
          <p className="report-title">每小時預報</p>

          <HourlyDropdown
            dataOptions={dataOptions}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <div className="hourly-report-content">
          {data[selectedDate]?.map((item, index) => {
            return <HourlyCard item={item} index={index} />;
          })}
        </div>
      </section>
    </>
  );
}

export default HourlyReport;
