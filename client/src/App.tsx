import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Project } from "../models/index";

function App(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function get() {
      const res = await axios.get("http://localhost:5000/projects");
      const p: Project[] = res.data;
      setProjects(p);
    }
    get();
  }, []);

  return (
    <div>
      {projects.map((p, i) => (
        <ul>
          <a target="_blank" href={p.twitterUrl}>
            {p.name}
          </a>

          <li>
            <b>Release date:</b> {p.releaseDate}
          </li>
          <li>
            <b> Twitter Followers: </b>
            {p.twitterFollowers}
          </li>
          <li>
            <b> Average Tweet Engagement:</b> {p.twitterAverageTweetEngagement}{" "}
          </li>
          <li>
            <b>Following change: </b>+{p.trends.followingChange} ({p.trends.followingPercentChange}
            %)
          </li>
        </ul>
      ))}
    </div>
  );
}

export default App;
