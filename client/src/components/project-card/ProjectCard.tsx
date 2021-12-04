import "./ProjectCard.css";
import Stat from "./Stat";
import Socials from "./Socials";
import DateTopper from "./DateTopper";
import { useAppSelector } from "../../redux/hooks";
import { Skeleton } from "antd";
import ShowGraphButton from "./ShowGraphButton";

type Props = { project: Project };
export default function ProjectCard({ project }: Props) {
  const loading = useAppSelector((state) => state.status.loading);

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

  if (loading) {
    return <Skeleton />;
  }
  return (
    <div className="project-card">
      <div className="not-bottom">
        <DateTopper date={project.releaseDate} />

        <div className="header">
          <img alt={"Twitter Avatar"} src={covertAvatar(project.avatar)} />
          <div>
            <h2>{truncatedName}</h2>
            <p>
              {project.price !== undefined && `${project.price} SOL mint | `}
              {project.quantity && `${project.quantity} supply`}
            </p>

            <Socials size={30} project={project} />
          </div>
        </div>
        <p style={{ color: "var(--gray-0)", marginBottom: "var(--padding-small)" }}>
          {project.description}
        </p>
      </div>
      <div className="stats-row">
        <Stat
          caption="Followers"
          current={project.twitterFollowers}
          change={project.trends!.followingChange}
          percentage={project.trends!.followingPercentChange}
        />
        <Stat
          caption="Average Likes/Tweet"
          current={project.twitterAverageTweetEngagement!}
          change={project.trends!.tweetEngagementChange}
          percentage={project.trends!.tweetEngagementPercentChange}
        />
        <Stat
          caption="Average Likes/Mention"
          current={project.twitterAverageMentionEngagement!}
          change={project.trends!.tweetMentionChange}
          percentage={project.trends!.tweetMentionPercentChange}
        />
        <ShowGraphButton />
      </div>
    </div>
  );
}
