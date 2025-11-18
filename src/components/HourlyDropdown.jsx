import "./HourlyDropdown.css";
import { useRef, useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

function HourlyDropdown({ selectedDate, setSelectedDate, dataOptions }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const buttonContent =
    dataOptions.find((opt) => opt.date === selectedDate)?.dropdownLabel ??
    "選擇日期";

  function handleDropdownButton() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  useEffect(() => {
    if (dataOptions.length > 0 && !selectedDate) {
      setSelectedDate(dataOptions[0].date);
    }
  }, [dataOptions, selectedDate, setSelectedDate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="weekdays-dropdown" ref={dropdownRef}>
        <button onClick={handleDropdownButton}>
          {buttonContent} <IoIosArrowDown />
        </button>
        <div className={`select-weekdays ${isDropdownOpen ? "show" : ""}`}>
          {dataOptions.map((option) => {
            return (
              <button
                className={`hourly-dropdown-items ${
                  selectedDate === option.date ? "selected" : ""
                }`}
                type="button"
                key={option.date}
                onClick={() => {
                  setSelectedDate(option.date);
                  setIsDropdownOpen(false);
                  console.log(option.date);
                }}
              >
                {option.dropdownLabel}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HourlyDropdown;
