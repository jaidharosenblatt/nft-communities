import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import ProjectCard from "./project-card/ProjectCard";
import Navbar from "./navbar/Navbar";
import Filters from "./filters/Filters";
import { useAppDispatch } from "../redux/hooks";
import { setCount } from "../redux/projects";

function App(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [sortBy, setSortBy] = useState<string>("twitterFollowers");
  const [sortDirectionIsDesc, setSortDirectionIsDesc] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  async function getData() {
    const res = await axios.get("http://localhost:5000/projects", {
      params: {
        sortBy: "releaseDate",
        sortDirection: sortDirectionIsDesc ? "desc" : "asc",
        filters: { twitterFollowers: { $gte: 5000 } },
        limit: 100,
        startDate: new Date().toString(),
      },
    });
    dispatch(setCount(res.data.count));
    const p: Project[] = res.data.projects;
    setProjects(p);
  }
  useEffect(() => {
    getData();
  }, []);

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
