import "./SubmitCollection.css";
import SubmitProjectForm from "../../components/submit-project/SubmitProjectForm";
import SubmitProjectModal from "../../components/submit-project/SubmitProjectModal";

export default function SubmitCollection() {
  return (
    <div className="navbar-full-page">
      <div className="card">
        <SubmitProjectForm />
        <SubmitProjectModal />
      </div>
    </div>
  );
}
