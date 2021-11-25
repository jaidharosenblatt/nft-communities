import "./Navbar.css";

type Params = { projectsLength: number };

export default function Navbar({ projectsLength }: Params) {
  return <div className="navbar">{projectsLength} projects</div>;
}
