import "./SubmitCollection.css";
import tracedMonke from "../../static/tracedMonke.png";
import tracedBird from "../../static/tracedBird.png";
import SubmitProjectForm from "../../components/submit-project-form/SubmitProjectForm";

export default function SubmitCollection() {
  return (
    <div className="navbar-full-page">
      <div className="submit-collection">
        <div className="card">
          <div className="body">
            <h2>Submit Collection</h2>
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
