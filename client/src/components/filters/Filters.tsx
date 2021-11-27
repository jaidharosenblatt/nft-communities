import { IoFilter } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import { AiOutlineStock } from "react-icons/ai";

import IconText from "../util/IconText";
import "./Filters.css";
import SortSelector from "../form/SortSelector";
import TimePeriodSelector from "../form/TimePeriodSelector";
import { useAppSelector } from "../../redux/hooks";
import MintDatePicker from "../form/MintDatePicker";
export default function Filters() {
  const filters = useAppSelector((state) => state.filters);

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
        <MintDatePicker filterParam={"startDate"} label="Earliest Mint Date" />
        <MintDatePicker filterParam={"endDate"} label="Latest Mint Date" />
      </div>
    </div>
  );
}
