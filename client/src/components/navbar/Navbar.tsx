import "./Navbar.css";
import DarkModeSwitch from "../form/DarkModeSwitch";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="row">
        <h1>
          Move<span style={{ color: "var(--primary)" }}>mints</span>
        </h1>

        <div className="body">
          <div className="right">
            <DarkModeSwitch />
          </div>
        </div>
      </div>
    </div>
  );
}
