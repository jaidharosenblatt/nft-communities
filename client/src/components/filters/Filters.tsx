import { IoFilter } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import { AiOutlineClockCircle, AiOutlineStock } from "react-icons/ai";

import IconText from "../util/IconText";
import "./Filters.css";
import SortSelector from "../form/SortSelector";
import TimePeriodSelector from "../form/TimePeriodSelector";
import { useAppSelector } from "../../redux/hooks";
import MintDatePicker from "../form/MintDatePicker";
import { Divider } from "antd";
export default function Filters() {
  const filters = useAppSelector((state) => state.filters);

  return (
    <div className="filters">
      <div className="wrapper">
        <IconText color="var(--primary)" icon={<BiSortAlt2 size={16} />} text={<h3>Sort</h3>} />
        <Divider />
        <SortSelector />
        <IconText color="var(--primary)" icon={<IoFilter size={16} />} text={<h3>Filter</h3>} />
        <Divider />
        <IconText
          color="var(--primary-text)"
          icon={<AiOutlineStock size={14} />}
          text={<p>Time Frame</p>}
        />
        <TimePeriodSelector />
        <IconText
          color="var(--primary-text)"
          icon={<AiOutlineClockCircle size={14} />}
          text={<p>Mint Date</p>}
        />
        <MintDatePicker />
      </div>
    </div>
  );
}
