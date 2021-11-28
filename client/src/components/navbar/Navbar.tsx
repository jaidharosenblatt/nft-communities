import "./Navbar.css";
import Mint from "../../static/mint.svg";
import { useAppSelector } from "../../redux/hooks";
import DarkModeSwitch from "../form/DarkModeSwitch";

export default function Navbar() {
  const count = useAppSelector((state) => state.projects.count);
  const loading = useAppSelector((state) => state.status.loading);

  return (
    <div className="navbar">
      <div className="row">
        <h1>
          Move<span style={{ color: "var(--primary)" }}>mints</span>
        </h1>
        <img
          alt="logo"
          style={{ width: 20, height: 20, marginLeft: "var(--padding-small)" }}
          src={Mint}
        />
        <div className="body">
          <div className="right">
            <DarkModeSwitch />
          </div>
          <p className="caption">
            {loading ? "Loading collections..." : `${count} collections found`}
          </p>
        </div>
      </div>
    </div>
  );
}
