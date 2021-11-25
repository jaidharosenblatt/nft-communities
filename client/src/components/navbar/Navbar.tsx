import TimePeriodSelector from "../form/TimePeriodSelector";
import "./Navbar.css";

type Params = { projectsLength: number };

export default function Navbar({ projectsLength }: Params) {
  return (
    <div className="navbar">
      <div className="row">
        <h1>
          Move<span style={{ color: "var(--primary)" }}>mint</span>
        </h1>
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
