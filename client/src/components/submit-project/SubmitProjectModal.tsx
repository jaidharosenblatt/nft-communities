import { Button, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearSubmitProject } from "../../redux/actionCreators";
import "./SubmitProject.css";
import TwitterImage from "../project-card/TwitterImage";
import Socials from "../project-card/Socials";

export default function SubmitProjectModal() {
  const submittedProject = useAppSelector((state) => state.submitCollection.project);

  const dispatch = useAppDispatch();
  return (
    <Modal centered footer={false} visible={submittedProject !== undefined}>
      {submittedProject && (
        <div className="submit-project-modal">
          <h2> Collection Submitted </h2>
          <div className="row">
            <TwitterImage project={submittedProject} />
            <div>
              <h2> {submittedProject.name}</h2>
              <Socials size={24} project={submittedProject} />
            </div>
          </div>
          <p>
            {submittedProject.name} will be in the collections page soon. Please check back in a few
            days
          </p>
          <Button style={{ width: "100%" }} onClick={() => dispatch(clearSubmitProject())}>
            Okay
          </Button>
        </div>
      )}
    </Modal>
  );
}
