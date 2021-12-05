import { Button, Modal } from "antd";
import { GRAPH_MODAL_WIDTH, GRAPH_MODAL_WIDTH_MOBILE } from "../../constants";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { closeHighlightedProject } from "../../redux/actionCreators";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import DateTopper from "../project-card/DateTopper";
import ProjectCardHeader from "../project-card/ProjectCardHeader";
import StatsRow from "../project-card/StatsRow";
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
      className="graph"
      visible={showModal}
    >
      {project && (
        <div className="project-card">
          <DateTopper date={project.releaseDate} />
          <ProjectCardHeader project={project} />
          <StatsRow project={project} />
        </div>
      )}
      <FieldSelector />
      <Graph />

      <Button type="primary" style={{ width: "100%" }} onClick={close}>
        Close Trends
      </Button>
    </Modal>
  );
}
