import { useEffect } from "react";
import ProjectCard from "../project-card/ProjectCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getLastUpdated, getProjects } from "../../redux/actionCreators";
import { notification, Skeleton } from "antd";
import { setError } from "../../redux/status";
import PaginationCard from "../form/PaginationCard";

export default function Projects() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects);
  const filters = useAppSelector((state) => state.filters);
  const { loading, error } = useAppSelector((state) => state.status);

  useEffect(
    function (): () => void {
      if (error) {
        notification.error({
          message: "Something went wrong...",
          description: error,
        });
      } else {
        dispatch(getProjects());
        dispatch(getLastUpdated());
      }

      return () => {
        if (error) {
          dispatch(setError(undefined));
        }
      };
    },
    [error, dispatch, projects.skip, projects.limit, filters]
  );
  return (
    <>
      <div className="pagination-card-top">
        <p className="caption" style={{ marginBottom: "var(--padding-medium)" }}>
          {loading ? "Loading collections..." : `${projects.count} collections found`}
        </p>
        <PaginationCard />
      </div>
      <div className="projects-holder">
        {loading && projects.count === 0 ? (
          <Skeleton />
        ) : (
          projects.projects.map((p: Project, i) => <ProjectCard key={i} project={p} />)
        )}
      </div>
      <div className="pagination-card-bottom">
        <PaginationCard />
      </div>
    </>
  );
}
