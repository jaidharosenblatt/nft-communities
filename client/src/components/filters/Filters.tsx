import { IoFilter } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import { AiOutlineStock } from "react-icons/ai";

import IconText from "../util/IconText";
import "./Filters.css";
import SortSelector from "../form/SortSelector";
import TimePeriodSelector from "../form/TimePeriodSelector";
export default function Filters() {
  return (
    <div className="filters">
      <div className="wrapper">
        <IconText
          color="var(--primary-text)"
          icon={<AiOutlineStock size={16} />}
          text={<h3>Time Period</h3>}
        />

        <TimePeriodSelector />

        <IconText
          color="var(--primary-text)"
          icon={<BiSortAlt2 size={16} />}
          text={<h3>Sort</h3>}
        />
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
