import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Project } from "../models/index";
import ProjectCard from "./project-card/ProjectCard";
import Navbar from "./navbar/Navbar";

function App(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [sortBy, setSortBy] = useState<string>("twitterFollowers");
  const [sortDirectionIsDesc, setSortDirectionIsDesc] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  async function getData() {
    const res = await axios.get("http://localhost:5000/projects", {
      params: {
        sortBy,
        sortDirection: sortDirectionIsDesc ? "desc" : "asc",
        filters: { twitterFollowers: { $gte: 0 } },
        limit: 10,
        // startDate: new Date().toString(),
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
      <div className="filters" />
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
