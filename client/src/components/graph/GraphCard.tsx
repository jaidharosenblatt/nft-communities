import { Button, Modal } from "antd";
import { GRAPH_MODAL_WIDTH, GRAPH_MODAL_WIDTH_MOBILE } from "../../constants";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { closeHighlightedProject } from "../../redux/actionCreators";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ProjectCard from "../project-card/ProjectCard";
import FieldSelector from "./FieldSelector";
import Graph from "./Graph";

export default function GraphCard() {
  const { project } = useAppSelector((state) => state.graph);
  const { isMobile } = useWindowDimensions();

  const showModal = project !== undefined;
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(closeHighlightedProject());
  };

  return (
    <Modal
      width={isMobile ? GRAPH_MODAL_WIDTH_MOBILE : GRAPH_MODAL_WIDTH}
      onCancel={close}
      footer={null}
      visible={showModal}
    >
      {project && <ProjectCard project={project} />}
      <FieldSelector />
      <Graph />

      <Button type="primary" style={{ width: "100%" }} onClick={close}>
        Close Trends
      </Button>
    </Modal>
  );
}
