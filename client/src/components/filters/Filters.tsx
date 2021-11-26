import { IoFilter } from "react-icons/io5";
import { FaSort } from "react-icons/fa";

import IconText from "../util/IconText";
import "./Filters.css";
import SortSelector from "../form/SortSelector";
export default function Filters() {
  return (
    <div className="filters">
      <div className="wrapper">
        <IconText color="var(--primary-text)" icon={<FaSort size={16} />} text={<h3>Sort</h3>} />
        <SortSelector />

        <IconText
          color="var(--primary-text)"
          icon={<IoFilter size={16} />}
          text={<h3>Filter</h3>}
        />
      </div>
    </div>
  );
}
