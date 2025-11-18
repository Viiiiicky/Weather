import { useDeferredValue, useEffect, useRef, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getGeoInfo } from "./fetcher";
import "./Searchbar.css";
import { debounce } from "lodash";

function Searchbar({ city, setCity, setActiveCity, onSubmitCity }) {
  const resultRef = useRef();
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  // const cities = [
  //   "Taipei",
  //   "Taichung",
  //   "New York",
  //   "Tokyo",
  //   "Berlin",
  //   "Singapore",
  //   "London",
  // ];

  const { data: geoData } = useSuspenseQuery({
    queryKey: ["geoData", deferredQuery],
    queryFn: () => getGeoInfo(deferredQuery),
    enabled: !!deferredQuery,
  });

  useEffect(() => {
    if (!geoData?.results) return;

    const sortedData = [...geoData.results].sort(
      (a, b) => (b.population || 0) - (a.population || 0)
    );

    console.log(sortedData);

    const cityList = sortedData.map(
      (city) => `${city.name}${city.country ? `, ${city.country}` : ""}`
    );
    setResults(cityList);
  }, [geoData]);

  const debounceSearch = debounce((value) => {
    if (value.trim() === "") {
      setResults([]);
    }
    setQuery(value.trim());
  }, 1_000);

  function handleInput(event) {
    const value = event.target.value;
    setCity(value);
    debounceSearch(value);
  }

  // 若使用者點選建議結果，立刻以該結果查詢資料
  function handleResultSelect(selectedCity) {
    setCity(selectedCity);

    setActiveCity(selectedCity);
    setResults([]);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (resultRef.current && !resultRef.current.contains(event.target)) {
        setResults([]);
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <section className="search-section">
        <h1 className="search-title">今天天氣怎麼樣?</h1>
        <div className="searchbar-wrapper">
          <form onSubmit={onSubmitCity}>
            <div className="input-wrapper">
              <input
                type="text"
                id="search-input"
                className="search-input"
                placeholder="目前僅支援英文城市名稱查詢..."
                value={city}
                onChange={(event) => handleInput(event)}
              />
              {results.length > 0 && (
                <>
                  <div className="search-results" ref={resultRef}>
                    {results.map((result, index) => (
                      <button
                        className="search-result-items"
                        type="button"
                        key={index}
                        onClick={() => handleResultSelect(result)}
                      >
                        {result}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <button className="search-button" type="submit">
              搜尋
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Searchbar;
