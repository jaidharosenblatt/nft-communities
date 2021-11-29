import "./Navbar.css";
import Mint from "../../static/mint.svg";
import { useAppSelector } from "../../redux/hooks";
import DarkModeSwitch from "../form/DarkModeSwitch";

type Props = { showCount?: boolean };
export default function Navbar({ showCount }: Props) {
  const count = useAppSelector((state) => state.projects.count);
  const loading = useAppSelector((state) => state.status.loading);

  return (
    <div className="navbar">
      <div className="row">
        <h1>
          Move<span style={{ color: "var(--primary)" }}>mints</span>
        </h1>

        <div className="body">
          <div className="right">
            <DarkModeSwitch />
          </div>
          {showCount && (
            <p className="caption">
              {loading ? "Loading collections..." : `${count} collections found`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
