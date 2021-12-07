import { Button, Modal } from "antd";
import ProjectCardHeader from "../../components/project-card/ProjectCardHeader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearSubmitProject } from "../../redux/actionCreators";
import "./SubmitProject.css";

export default function SubmitProjectModal() {
  const submittedProject = useAppSelector((state) => state.submitCollection.project);

  const dispatch = useAppDispatch();
  return (
    <Modal centered footer={false} visible={submittedProject !== undefined}>
      {submittedProject && (
        <div className="submit-project-modal">
          <h2> {submittedProject.name} </h2>
          <p> ...will be in the collections page soon. Please check back in a few days. </p>
          <ProjectCardHeader project={submittedProject} />
          <Button style={{ width: "100%" }} onClick={() => dispatch(clearSubmitProject())}>
            Ok, I'll wait
          </Button>
        </div>
      )}
    </Modal>
  );
}
