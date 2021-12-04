import React from "react";
import { useAppSelector } from "../../redux/hooks";
import ProjectCard from "../project-card/ProjectCard";
import Graph from "./Graph";

export default function GraphCard() {
  const project = useAppSelector((state) => state.graph.project);
  if (!project) return null;

  return (
    <div>
      <Graph />
      <ProjectCard project={project} />
    </div>
  );
}
