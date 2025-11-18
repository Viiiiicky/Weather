import logo from "../assets/images/logo.svg";
import "./Navbar.css";
import UnitDropdown from "./UnitDropdown";

function Navbar({
  tempUnit,
  speedUnit,
  heightUnit,
  unit,
  setTempUnit,
  setSpeedUnit,
  setHeightUnit,
  setUnit,
}) {
  const units = { tempUnit, speedUnit, heightUnit, unit };
  const setUnits = { setTempUnit, setSpeedUnit, setHeightUnit, setUnit };

  return (
    <>
      <nav className="navbar">
        <img src={logo} alt="logo" className="nav-logo-img" />

        <UnitDropdown units={units} setUnits={setUnits} />
      </nav>
    </>
  );
}

export default Navbar;
