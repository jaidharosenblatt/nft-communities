import "./Navbar.css";
import DarkModeSwitch from "../form/DarkModeSwitch";
import BSBlack from "../../static/bs-black.svg";
import BSWhite from "../../static/bs-white.svg";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function Navbar() {
  const darkMode = useAppSelector((state) => state.status.darkMode);
  const { isMobile } = useWindowDimensions();
  return (
    <div className="navbar">
      <div className="row">
        <div className="logo-row">
          <Link to="/">
            <h1>
              Move<span style={{ color: "var(--secondary)" }}>mints</span>
            </h1>
          </Link>
          <div className="by-bs">
            <a
              style={{ color: "var(--primary-text)" }}
              rel="noreferrer"
              target="_blank"
              href="https://bridgesplit.com/"
            >
              |
              <img
                style={{ marginLeft: "var(--padding-medium)" }}
                alt="bs-logo"
                className="bs-logo"
                src={darkMode ? BSWhite : BSBlack}
              />
            </a>
          </div>
        </div>

        <div className="body">
          <div className="right">
            {!isMobile && (
              <>
                <Link to="/"> All Collections</Link>
                <Link to="/submit-collection"> Submit Collection</Link>
              </>
            )}

            <DarkModeSwitch />
          </div>
        </div>
      </div>
    </div>
  );
}
