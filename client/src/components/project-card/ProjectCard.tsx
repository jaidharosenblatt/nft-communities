import "./ProjectCard.css";
import { Project } from "../../../models";
import Stat from "./Stat";
import Socials from "./Socials";

type Props = { project: Project };
export default function ProjectCard({ project }: Props) {
  function getDateFromString(date: string | undefined) {
    if (!date) {
      return date;
    }
    return new Date(date).toDateString();
  }

  function covertAvatar(avatar: string): string {
    if (avatar.endsWith("png")) {
      return avatar.split("_normal.png")[0] + ".png";
    }
    if (avatar.endsWith("jpg")) {
      return avatar.split("_normal.jpg")[0] + ".jpg";
    }
    return "";
  }
  const truncatedN = 28;
  const truncatedName =
    project.name.length > truncatedN ? project.name.slice(0, truncatedN - 3) + "..." : project.name;
  return (
    <div className="project-card">
      <div className="header">
        <img src={covertAvatar(project.avatar)} />
        <div className="title">
          <h2>{truncatedName}</h2>
          <Socials size={24} color="black" project={project} />
        </div>
      </div>

      <p>{getDateFromString(project.releaseDate)}</p>
      <div className="stats-row">
        <Stat
          caption="Followers"
          change={project.trends!.followingChange}
          percentage={project.trends!.followingPercentChange}
        />
        <Stat
          caption="Average Likes"
          change={project.trends!.engagementChange}
          percentage={project.trends!.engagementPercentChange}
        />
      </div>
    </div>
  );
}
