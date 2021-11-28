import "./App.css";
import { useEffect } from "react";
import ProjectCard from "./project-card/ProjectCard";
import Navbar from "./navbar/Navbar";
import Filters from "./filters/Filters";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getLastUpdated, getProjects } from "../redux/actionCreators";
import ThemeSelector from "../themes/ThemeSelector";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.projects);
  const filters = useAppSelector((state) => state.filters);
  const darkMode = useAppSelector((state) => state.status.darkMode);

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getLastUpdated());
  }, [dispatch, filters]);

  return (
    <ThemeSelector isDark={darkMode}>
      <div className="grid">
        <Filters />
        <Navbar />
        <div className="projects-holder">
          {projects.map((p: Project) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      </div>
    </ThemeSelector>
  );
}

export default App;
