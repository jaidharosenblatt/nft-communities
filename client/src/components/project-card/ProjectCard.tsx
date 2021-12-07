import "./ProjectCard.css";
import DateTopper from "./DateTopper";
import { useAppSelector } from "../../redux/hooks";
import { Skeleton } from "antd";
import ShowGraphButton from "../graph/ShowGraphButton";
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
        <DateTopper date={project.releaseDate} />
        <ProjectCardHeader project={project} />

        <p style={{ color: "var(--gray-0)", marginBottom: "var(--padding-small)" }}></p>
      </div>
      <div className="stats-row">
        <StatsRow project={project} />
        <ShowGraphButton project={project} />
      </div>
    </div>
  );
}
