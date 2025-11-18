const GEO_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search?name=";
const WEATHER_BASE_URL = "https://api.open-meteo.com/v1/forecast?";

export function getGeoInfo(city) {
  return fetch(`${GEO_BASE_URL}${city}&count=5`).then((response) =>
    response.json()
  );
}

export function getWeather(
  latitude,
  longitude,
  tempUnit = "celsius",
  speedUnit = "kmh",
  heightUnit = "mm"
) {
  let tempParam = tempUnit === "celsius" ? "" : "&temperature_unit=fahrenheit";
  let speedParam = speedUnit === "kmh" ? "" : "&wind_speed_unit=mph";
  let heightParam = heightUnit === "mm" ? "" : "&precipitation_unit=inch";

  // &precipitation_unit=inch
  // &wind_speed_unit=mph
  // &temperature_unit=fahrenheit

  return fetch(
    `${WEATHER_BASE_URL}latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code&timezone=auto${tempParam}${speedParam}${heightParam}`
  ).then((response) => response.json());
}
