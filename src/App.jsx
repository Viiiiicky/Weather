import { useState, Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import WeatherReport from "./components/WeatherReport";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const [city, setCity] = useState("");
  const [activeCity, setActiveCity] = useState("Taipei");
  const [tempUnit, setTempUnit] = useState("celsius");
  const [speedUnit, setSpeedUnit] = useState("kmh");
  const [heightUnit, setHeightUnit] = useState("mm");
  const [unit, setUnit] = useState("metric");

  function onSubmitCity(event) {
    event.preventDefault();

    if (city.trim()) {
      setActiveCity(city.trim());
      setCity("");
    }
    console.log(city);
  }

  const units = { tempUnit, speedUnit, heightUnit, unit };

  return (
    <>
      {/* <ErrorBoundary fallback={<p>Navbar壞掉了嗚嗚!!</p>}> */}
      <Navbar
        tempUnit={tempUnit}
        speedUnit={speedUnit}
        heightUnit={heightUnit}
        unit={unit}
        setTempUnit={setTempUnit}
        setSpeedUnit={setSpeedUnit}
        setHeightUnit={setHeightUnit}
        setUnit={setUnit}
      ></Navbar>
      {/* </ErrorBoundary> */}
      {/* <ErrorBoundary fallback={<p>Searchbar壞掉了嗚嗚!!</p>}> */}
      <Searchbar
        city={city}
        setCity={setCity}
        setActiveCity={setActiveCity}
        onSubmitCity={onSubmitCity}
      ></Searchbar>
      {/* </ErrorBoundary> */}
      {/* <ErrorBoundary fallback={<p>WeatherReport壞掉了嗚嗚!!</p>}> */}
      <Suspense fallback={<p className="center">載入天氣資料中...</p>}>
        <WeatherReport activeCity={activeCity} units={units}></WeatherReport>
      </Suspense>
      {/* </ErrorBoundary> */}
    </>
  );
}

export default App;
