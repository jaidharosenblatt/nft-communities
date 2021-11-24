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
    <div
      style={{
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1> MoveMint </h1>
      {projects.map((p, i) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <a target="_blank" href={p.twitterUrl}>
            {p.name}
          </a>
          <p>
            <b>Release date:</b> {p.releaseDate}
          </p>
          <p>
            <b> Twitter Followers: </b>
            {p.twitterFollowers}
          </p>
          <p>
            <b> Average Tweet Engagement:</b> {p.twitterAverageTweetEngagement}{" "}
          </p>
          <p>
            <b>Following change: </b>
            <span style={{ color: p.trends.followingChange > 0 ? "green" : "red" }}>
              +{p.trends.followingChange}({p.trends.followingPercentChange} %)
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
