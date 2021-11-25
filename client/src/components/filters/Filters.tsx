import { Space } from "antd";
import { IoFilter } from "react-icons/io5";
import IconText from "../util/IconText";
import "./Filters.css";
export default function Filters() {
  return (
    <div className="filters">
      <div className="wrapper">
        <IconText color="var(--primary-text)" icon={<IoFilter />} text="Filters" />
      </div>
    </div>
  );
}
