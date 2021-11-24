import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Project } from "../../models/index";
import ProjectCard from "./project-card/ProjectCard";

function App(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [sortBy, setSortBy] = useState<string>("twitterFollowers");
  const [sortDirectionIsDesc, setSortDirectionIsDesc] = useState<boolean>(true);

  async function getData() {
    const res = await axios.get("http://localhost:5000/projects", {
      params: {
        sortBy,
        sortDirection: sortDirectionIsDesc ? "desc" : "asc",
        filters: { twitterFollowers: { $gte: 10000 } },
        startDate: new Date().toString(),
      },
    });
    const p: Project[] = res.data;
    setProjects(p);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>
        Move<span style={{ color: "#3CD184" }}>mint</span>
      </h1>
      <div className="projects-holder">
        {projects.length} Projects
        {projects.map((p: Project) => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </div>
    </div>
  );
}

export default App;
