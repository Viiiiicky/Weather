import { useEffect, useRef, useState } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import icon_units from "../assets/images/icon-units.svg";
import "./UnitDropdown.css";

function UnitDropdown({ units, setUnits }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { tempUnit, speedUnit, heightUnit, unit } = units;
  const { setTempUnit, setSpeedUnit, setHeightUnit, setUnit } = setUnits;

  function handleButtonClick() {
    setIsDropdownOpen((prev) => !prev);
  }

  function handleUnitClick(setting) {
    if (setting === "imperial") {
      setUnit(setting);
      setTempUnit("fahrenheit");
      setSpeedUnit("mph");
      setHeightUnit("inch");
    }

    if (setting === "metric") {
      setUnit(setting);
      setTempUnit("celsius");
      setSpeedUnit("kmh");
      setHeightUnit("mm");
    }

    if (setting === "celsius" || setting === "fahrenheit") {
      setTempUnit(setting);
    }

    if (setting === "kmh" || setting === "mph") {
      setSpeedUnit(setting);
    }
    if (setting === "mm" || setting === "inch") {
      setHeightUnit(setting);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const unitGroups = [
    {
      label: "溫度",
      getCurrentUnits: (unit) => unit.tempUnit,
      options: [
        { value: "celsius", label: "攝氏 (℃)", checkKey: "tempUnit" },
        { value: "fahrenheit", label: "華氏 (℉)", checkKey: "tempUnit" },
      ],
    },
    {
      label: "風速",
      getCurrentUnits: (unit) => unit.speedUnit,
      options: [
        { value: "kmh", label: "公里/時 (km/h)", checkKey: "speedUnit" },
        { value: "mph", label: "英里/時 (mph)", checkKey: "speedUnit" },
      ],
    },
    {
      label: "降雨量",
      getCurrentUnits: (unit) => unit.heightUnit,
      options: [
        { value: "mm", label: "公釐 (mm)", checkKey: "heightUnit" },
        { value: "inch", label: "英吋 (in)", checkKey: "heightUnit" },
      ],
    },
  ];

  return (
    <>
      <div className="units-dropdown" ref={dropdownRef}>
        <button className="units-dropdown-button" onClick={handleButtonClick}>
          <img src={icon_units} alt="units-icon" className="nav-units-img" />
          <span>單位</span>
          <IoIosArrowDown />
        </button>
        <div className={`dropdown-content ${isDropdownOpen ? "show" : ""}`}>
          <div className="dropdown-wrapper">
            <button
              className="dropdown-items switch-unit"
              onClick={() =>
                handleUnitClick(unit === "metric" ? "imperial" : "metric")
              }
            >
              {unit === "metric" ? "切換至英制" : "切換至公制"}
            </button>

            {unitGroups.map((item) => {
              const currentUnitValue = item.getCurrentUnits(units);
              return (
                <div className="unit-type-div" key={item.label}>
                  <p className="unit-type-label">{item.label}</p>

                  {item.options.map((option) => {
                    return (
                      <button
                        key={option.value}
                        className={`dropdown-items ${
                          currentUnitValue === option.value ? "selected" : ""
                        }`}
                        onClick={() => handleUnitClick(option.value)}
                      >
                        <span className="dropdown-items-label">
                          {option.label}
                        </span>
                        <span className="item-checked">
                          {currentUnitValue === option.value && (
                            <IoCheckmarkSharp />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default UnitDropdown;
