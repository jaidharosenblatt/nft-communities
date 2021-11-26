import "./ProjectCard.css";
import { Project } from "../../models";
import Stat from "./Stat";
import Socials from "./Socials";
import DateTopper from "./DateTopper";

type Props = { project: Project };
export default function ProjectCard({ project }: Props) {
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
      <DateTopper date={project.releaseDate} />

      <div className="header">
        <img alt={`${project.name} Twitter Avatar`} src={covertAvatar(project.avatar)} />
        <div>
          <h2>{truncatedName}</h2>
          <Socials size={30} project={project} />
        </div>
      </div>

      <div className="stats-row">
        <Stat
          caption="Followers"
          current={project.twitterFollowers}
          change={project.trends!.followingChange}
          percentage={project.trends!.followingPercentChange}
        />
        <Stat
          caption="Average Tweet Likes"
          current={project.twitterAverageTweetEngagement!}
          change={project.trends!.engagementChange}
          percentage={project.trends!.engagementPercentChange}
        />
      </div>
    </div>
  );
}
