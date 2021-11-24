import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Project } from "../models/index";

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

  async function changeSortBy(e: any) {
    const id = e.target.id;
    setSortBy(id);
    setSortDirectionIsDesc(!sortDirectionIsDesc);
    await getData();
  }

  function getChangeString(change: Number, percent: Number): String {
    if (change === 0) {
      return "0";
    }
    return `${change > 0 ? "+" : ""} ${change} (${percent}%)`;
  }

  function getChangeStyle(change: Number): Object {
    let color = "black";
    if (change > 0) color = "green";
    if (change < 0) color = "red";

    return { color };
  }

  function getDateFromString(date: string | undefined) {
    if (!date) {
      return date;
    }
    return new Date(date).toDateString();
  }

  function covertAvatar(avatar: string): string {
    if (avatar.endsWith("png")) {
      return avatar.split("_normal.png")[0] + "_bigger.png";
    }
    if (avatar.endsWith("jpg")) {
      return avatar.split("_normal.jpg")[0] + "_bigger.jpg";
    }
    return "";
  }

  return (
    <div
      style={{
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>
        Move<span style={{ color: "green" }}>mint</span> 🌿
      </h1>
      <table>
        <tr>
          <td></td>
          <td id="name" onClick={changeSortBy}>
            Name
          </td>
          <td id="releaseDate" onClick={changeSortBy}>
            Release Date
          </td>
          <td id="twitterFollowers" onClick={changeSortBy}>
            Twitter Followers
          </td>
          <td id="twitterAverageTweetEngagement" onClick={changeSortBy}>
            Average Tweet Likes
          </td>
          <td id="trends.followingChange" onClick={changeSortBy}>
            Followers Change
          </td>
          <td id="trends.engagementChange" onClick={changeSortBy}>
            Average Likes Change
          </td>
        </tr>
        {projects.map((p, i) => (
          <tr>
            <td>
              <img src={covertAvatar(p.avatar)} alt={p.name} />
            </td>
            <td>
              <a target="_blank" href={p.twitterUrl}>
                {p.name}
              </a>
            </td>
            <td>{getDateFromString(p.releaseDate)}</td>
            <td> {p.twitterFollowers}</td>

            <td>{p.twitterAverageTweetEngagement}</td>
            <td>
              <span style={getChangeStyle(p.trends.followingChange)}>
                {getChangeString(p.trends.followingChange, p.trends.followingPercentChange)}
              </span>
            </td>
            <td>
              <span style={getChangeStyle(p.trends.engagementChange)}>
                {getChangeString(p.trends.engagementChange, p.trends.engagementPercentChange)}
              </span>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
