import "./Navbar.css";
import DarkModeSwitch from "../form/DarkModeSwitch";
import BSLogo from "../../static/BSLogo.svg";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="row">
        <div className="logo-row">
          <img alt="bs-logo" src={BSLogo} />
          <h1>
            Move<span style={{ color: "var(--primary)" }}>mints</span>
          </h1>
        </div>

        <div className="body">
          <div className="right">
            <DarkModeSwitch />
          </div>
        </div>
      </div>
    </div>
  );
}
