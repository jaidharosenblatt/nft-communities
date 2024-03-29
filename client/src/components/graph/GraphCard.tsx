import { Button, Modal } from "antd";
import { GRAPH_MODAL_WIDTH, GRAPH_MODAL_WIDTH_MOBILE } from "../../constants";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { closeHighlightedProject } from "../../redux/actionCreators";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Graph from "./Graph";
import TwitterCreatedAt from "./TwitterCreatedAt";

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
      centered
      width={isMobile ? GRAPH_MODAL_WIDTH_MOBILE : GRAPH_MODAL_WIDTH}
      onCancel={close}
      footer={null}
      className="graph"
      visible={showModal}
    >
      {project && (
        <div>
          <h1> {project.name}</h1>
          <p> {project.description}</p>
          {/* <StatsRow project={project} /> */}
          <TwitterCreatedAt twitterCreatedAt={project.twitterCreatedAt} />
        </div>
      )}
      <Graph />

      <Button style={{ width: "100%" }} onClick={close}>
        Close
      </Button>
    </Modal>
  );
}
