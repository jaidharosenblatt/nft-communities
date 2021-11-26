import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Project } from "../models/index";
import ProjectCard from "./project-card/ProjectCard";
import Navbar from "./navbar/Navbar";
import Filters from "./filters/Filters";
import SortSelector from "./form/SortSelector";

function App(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [sortBy, setSortBy] = useState<string>("twitterFollowers");
  const [sortDirectionIsDesc, setSortDirectionIsDesc] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  async function getData() {
    const res = await axios.get("http://localhost:5000/projects", {
      params: {
        sortBy: "twitterFollowers",
        sortDirection: sortDirectionIsDesc ? "desc" : "asc",
        filters: { twitterFollowers: { $gte: 1000 } },
        limit: 10,
        startDate: new Date().toString(),
      },
    });
    const p: Project[] = res.data.projects;
    setCount(res.data.count);
    setProjects(p);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="grid">
      <Filters />
      <Navbar projectsLength={count} />
      <div className="projects-holder">
        {projects.map((p: Project) => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </div>
    </div>
  );
}

export default App;
