import { Modal } from "antd";
import { closeHighlightedProject } from "../../redux/actionCreators";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ProjectCard from "../project-card/ProjectCard";
import Graph from "./Graph";

export default function GraphCard() {
  const project = useAppSelector((state) => state.graph.project);
  const showModal = project !== undefined;
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeHighlightedProject());
  };

  return (
    <Modal title="Basic Modal" onCancel={close} onOk={close} visible={showModal}>
      <Graph />
      {project && <ProjectCard project={project} />}
    </Modal>
  );
}
