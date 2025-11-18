import dateFormatter from "./dateFormatter.js";

function useHourlyData(hourly) {
  //把時間戳記轉換為12小時制(AM/PM)的函式
  const formatHour = (hour) => {
    if (hour === 0) return "12AM";
    if (hour === 12) return "12PM";

    return hour < 12 ? `${hour}AM` : `${hour - 12}PM`;
  };

  //將API提供的七日、每小時天氣陣列轉為一個物件，並依據日期分組
  const data =
    hourly?.time?.reduce((result, timeStamp, index) => {
      const date = timeStamp.split("T")[0];
      const hour = new Date(timeStamp).getHours();

      const formattedHour = formatHour(hour);

      //如果尚不存在目前日期的key值，以該日期為key值，建立同一天資料為value陣列
      if (!result[date]) {
        result[date] = [];
      }

      result[date].push({
        hour: formattedHour,
        temp: hourly.temperature_2m[index],
        code: hourly.weather_code[index],
      });

      return result;
    }, {}) ?? {};

  const dataKeys = Object.keys(data);
  const dataOptions = dataKeys.map((date) => {
    const dropdownLabel = dateFormatter(date, "weekday");

    return {
      date,
      dropdownLabel,
    };
  });

  return { data, dataOptions };
}

export default useHourlyData;
