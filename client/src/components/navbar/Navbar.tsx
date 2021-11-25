import "./Navbar.css";

type Params = { projectsLength: number };

export default function Navbar({ projectsLength }: Params) {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="body">
          <h1>
            Move<span style={{ color: "#3CD184" }}>mint</span>
          </h1>
          <p className="caption">{projectsLength} projects found</p>
        </div>
      </div>
    </div>
  );
}
