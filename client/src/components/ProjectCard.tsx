import "./ProjectCard.css";
import { Project } from "../../models";
import { IoBrowsers, IoLogoTwitter, IoLogoDiscord } from "react-icons/io5";

type Props = { project: Project };
export default function ProjectCard({ project }: Props) {
  function getChangeString(change: Number, percent: Number): String {
    if (change === 0) {
      return "0";
    }
    return `${change > 0 ? "+" : ""} ${change} (${percent}%)`;
  }

  function getChangeStyle(change: Number): Object {
    let color = "#434343";
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
          <div className="social">
            <a target="_blank" href={project.twitterUrl}>
              <IoLogoTwitter color="#434343" size="24px" />
            </a>
            {project.website && (
              <a target="_blank" href={project.website}>
                <IoBrowsers color="#434343" size="24px" />
              </a>
            )}
            {project.discordUrl && (
              <a target="_blank" href={project.discordUrl}>
                <IoLogoDiscord color="#434343" size="24px" />
              </a>
            )}
          </div>
        </div>
      </div>

      <p>{getDateFromString(project.releaseDate)}</p>
      <div className="stats-row">
        <div className="stat">
          <p className="caption"> Followers</p>
          <p style={getChangeStyle(project.trends!.followingChange)}>
            {getChangeString(
              project.trends!.followingChange,
              project.trends!.followingPercentChange
            )}
          </p>
        </div>
        <div className="stat">
          <p className="caption"> Average Likes</p>
          <p style={getChangeStyle(project.trends!.engagementChange)}>
            {getChangeString(
              project.trends!.engagementChange,
              project.trends!.engagementPercentChange
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
