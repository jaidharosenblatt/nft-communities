import TimePeriodSelector from "../form/TimePeriodSelector";
import "./Navbar.css";
import Mint from "../../static/mint.svg";
import { IoLogoTwitter } from "react-icons/io5";
import IconText from "../util/IconText";
type Params = { projectsLength: number };

export default function Navbar({ projectsLength }: Params) {
  return (
    <div className="navbar">
      <div className="row">
        <h1>
          Move<span style={{ color: "var(--primary)" }}>mint</span>
        </h1>
        <img style={{ width: 20, height: 20, marginLeft: "var(--padding-small)" }} src={Mint} />
        <div className="body">
          <div className="right">
            Updates and Feedback
            <a target="_blank" rel="noreferrer" href="https://twitter.com/jaidharo">
              <IconText color="var(--primary)" icon={<IoLogoTwitter />} text={<p>@jaidharo</p>} />
            </a>
          </div>
          <p className="caption">{projectsLength} collections found</p>
        </div>
      </div>
    </div>
  );
}
