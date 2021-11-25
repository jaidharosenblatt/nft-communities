import TimePeriodSelector from "../form/TimePeriodSelector";
import "./Navbar.css";
import Mint from "../../static/mint.svg";
type Params = { projectsLength: number };

export default function Navbar({ projectsLength }: Params) {
  return (
    <div className="navbar">
      <div className="row">
        <h1>
          Move<span style={{ color: "var(--primary)" }}>mint</span>
        </h1>
        <img style={{ width: 20, height: 20, marginLeft: "var(--padding-small)" }} src={Mint} />
        <div className="body">
          <div className="right">
            <TimePeriodSelector />
          </div>
          <p className="caption">{projectsLength} collections found</p>
        </div>
      </div>
    </div>
  );
}
