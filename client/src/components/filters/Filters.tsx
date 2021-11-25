import { Collapse } from "antd";
import { IoFilter } from "react-icons/io5";
import { FaSort } from "react-icons/fa";

import IconText from "../util/IconText";
import "./Filters.css";
export default function Filters() {
  const { Panel } = Collapse;

  return (
    <div className="filters">
      <div className="wrapper">
        <IconText color="var(--primary-text)" icon={<FaSort size={18} />} text={<h2>Sort</h2>} />
        <IconText
          color="var(--primary-text)"
          icon={<IoFilter size={18} />}
          text={<h2>Filter</h2>}
        />
      </div>
    </div>
  );
}
