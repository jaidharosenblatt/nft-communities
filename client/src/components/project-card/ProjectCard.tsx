import "./ProjectCard.css";
import { useAppSelector } from "../../redux/hooks";
import { Skeleton } from "antd";
import ProjectCardHeader from "./ProjectCardHeader";
import StatsRow from "./StatsRow";

type Props = { project: Project };
export default function ProjectCard({ project }: Props) {
  const loading = useAppSelector((state) => state.status.loading);

  if (loading) {
    return <Skeleton />;
  }
  return (
    <div className="project-card">
      <div className="not-bottom">
        <ProjectCardHeader project={project} />
      </div>
      <div className="stats-row">
        <StatsRow project={project} />
      </div>
    </div>
  );
}
