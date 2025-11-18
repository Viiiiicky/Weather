import SubCard from "./SubCard";
import "./SubReport.css";

function SubReport({ current, units }) {
  // const {
  //   apparent_temperature: apparent_temp = "N/A",
  //   relative_humidity_2m: humidity = "N/A",
  //   precipitation: precipitation = "N/A",
  //   wind_speed_10m: wind = "N/A",
  // } = current;

  const fields = [
    { label: "體感溫度", key: "apparent_temperature", type: "temp" },
    { label: "相對溼度", key: "relative_humidity_2m", type: "humidity" },
    { label: "降雨量", key: "precipitation", type: "height" },
    { label: "風速", key: "wind_speed_10m", type: "speed" },
  ];

  return (
    <>
      <section className="sub-report-section">
        {fields.map(({ label, key, type }) => (
          <SubCard
            units={units}
            label={label}
            value={current?.[key]}
            type={type}
          />
        ))}
      </section>
    </>
  );
}

export default SubReport;
