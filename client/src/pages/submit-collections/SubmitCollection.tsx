import "./SubmitCollection.css";
import SubmitProjectForm from "../../components/submit-project-form/SubmitProjectForm";

export default function SubmitCollection() {
  return (
    <div className="navbar-full-page">
      <div className="submit-collection">
        <div className="card">
          <div className="body">
            <h2>[Coming Soon] Submit Collection</h2>
            <p className="caption">
              Collections are manually verified and are updated every 1-2 days.
            </p>
            <SubmitProjectForm />
          </div>
        </div>
      </div>
    </div>
  );
}
