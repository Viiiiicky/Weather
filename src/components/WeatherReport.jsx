import { useSuspenseQuery } from "@tanstack/react-query";
import { getGeoInfo, getWeather } from "./fetcher";
import MainReport from "./MainReport";
import SubReport from "./SubReport";
import DailyReport from "./DailyReport";
import HourlyReport from "./HourlyReport";
import "./WeatherReport.css";

function WeatherReport({ activeCity, units }) {
  const { tempUnit, speedUnit, heightUnit, unit } = units;

  const { data: geoData } = useSuspenseQuery({
    queryKey: ["geoData", activeCity],
    queryFn: () => getGeoInfo(activeCity),
  });

  console.log(geoData);

  const latitude = geoData?.results?.[0]?.latitude;
  const longitude = geoData?.results?.[0]?.longitude;

  const { data: weatherData } = useSuspenseQuery({
    queryKey: [
      "weatherData",
      geoData?.results?.[0]?.id,
      latitude,
      longitude,
      tempUnit,
      speedUnit,
      heightUnit,
    ],
    queryFn: () =>
      getWeather(latitude, longitude, tempUnit, speedUnit, heightUnit),
    //========本次修改隱藏的=======
    // enabled: !!geoData,
  });
  console.log(weatherData);

  // 還有輸入不存在的地名要顯示提示文字

  return (
    <>
      <section className="weather-report-section">
        <div className="left-column">
          <MainReport
            current={weatherData.current}
            location={geoData.results[0]}
          ></MainReport>
          <SubReport units={units} current={weatherData.current}></SubReport>
          <DailyReport daily={weatherData.daily}></DailyReport>
        </div>
        <div className="right-column">
          <HourlyReport hourly={weatherData.hourly}></HourlyReport>
        </div>
      </section>
    </>
  );
}

export default WeatherReport;
