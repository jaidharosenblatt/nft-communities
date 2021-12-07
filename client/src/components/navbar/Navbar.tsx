import "./Navbar.css";
import DarkModeSwitch from "../form/DarkModeSwitch";
import BSBlack from "../../static/bs-black.svg";
import BSWhite from "../../static/bs-white.svg";

import { useAppSelector } from "../../redux/hooks";

export default function Navbar() {
  const darkMode = useAppSelector((state) => state.status.darkMode);
  return (
    <div className="navbar">
      <div className="row">
        <div className="logo-row">
          <h1>
            Move<span style={{ color: "var(--primary)" }}>mints</span>
          </h1>
          <div className="by-bs">
            <a
              style={{ color: "var(--primary-text)" }}
              rel="noreferrer"
              target="_blank"
              href="https://bridgesplit.com/"
            >
              |
              <img
                style={{ marginLeft: "var(--padding-small)" }}
                alt="bs-logo"
                className="bs-logo"
                src={darkMode ? BSWhite : BSBlack}
              />
            </a>
          </div>
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
