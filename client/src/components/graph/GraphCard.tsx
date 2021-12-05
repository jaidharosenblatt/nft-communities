import { Button, Modal } from "antd";
import { closeHighlightedProject } from "../../redux/actionCreators";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ProjectCard from "../project-card/ProjectCard";
import FieldSelector from "./FieldSelector";
import Graph from "./Graph";

export default function GraphCard() {
  const project = useAppSelector((state) => state.graph.project);
  const showModal = project !== undefined;
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeHighlightedProject());
  };

  return (
    <Modal onCancel={close} footer={null} visible={showModal}>
      {project && <ProjectCard project={project} />}
      <FieldSelector />

      <Graph />
      <Button type="primary" style={{ width: "100%" }} onClick={close}>
        Close Trends
      </Button>
    </Modal>
  );
}
