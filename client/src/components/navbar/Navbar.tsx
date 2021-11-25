import "./Navbar.css";

type Params = { projectsLength: number };

export default function Navbar({ projectsLength }: Params) {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="body">
          <p className="caption">{projectsLength} projects</p>
        </div>
      </div>
    </div>
  );
}
