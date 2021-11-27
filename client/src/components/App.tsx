import "./App.css";
import { useEffect } from "react";
import ProjectCard from "./project-card/ProjectCard";
import Navbar from "./navbar/Navbar";
import Filters from "./filters/Filters";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getProjects } from "../redux/actionCreators";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.projects);
  const filters = useAppSelector((state) => state.filters);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch, filters]);

  return (
    <div className="grid">
      <Filters />
      <Navbar />
      <div className="projects-holder">
        {projects.map((p: Project) => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </div>
    </div>
  );
}

export default App;
