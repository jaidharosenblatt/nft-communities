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
          <p className="caption">{projectsLength} projects found</p>
        </div>
      </div>
    </div>
  );
}
