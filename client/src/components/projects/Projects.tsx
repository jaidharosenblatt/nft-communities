import { useEffect } from "react";
import ProjectCard from "../project-card/ProjectCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getLastUpdated, getProjects } from "../../redux/actionCreators";
import { Skeleton } from "antd";
import PaginationCard from "../form/PaginationCard";
import GraphCard from "../graph/GraphCard";
import { Link } from "react-router-dom";

export default function Projects() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects);
  const filters = useAppSelector((state) => state.filters);
  const { loading, error } = useAppSelector((state) => state.status);

  useEffect(() => {
    if (!error) {
      dispatch(getProjects());
      dispatch(getLastUpdated());
    }
  }, [error, dispatch, projects.skip, projects.limit, filters]);
  return (
    <>
      <div className="pagination-card-top">
        <p className="caption" style={{ marginBottom: "var(--padding-medium)" }}>
          {loading ? "Loading collections..." : `${projects.count} collections found`}
        </p>
        {projects.count > 0 && <PaginationCard />}
        {projects.count === 0 && !loading && (
          <h2>
            Don't see your project? <Link to="/submit-collection">You can add it here</Link>{" "}
          </h2>
        )}
        <GraphCard />
      </div>
      <div className="projects-holder">
        {loading && projects.count === 0 ? (
          <Skeleton />
        ) : (
          projects.projects.map((p: Project, i) => <ProjectCard key={i} project={p} />)
        )}
      </div>

      <div className="pagination-card-bottom">{projects.count > 0 && <PaginationCard />}</div>
    </>
  );
}
