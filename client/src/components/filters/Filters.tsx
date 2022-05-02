import { IoFilter, IoLogoTwitter } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import { AiOutlineClockCircle } from "react-icons/ai";
import IconText from "../util/IconText";
import "./Filters.css";
import SortSelector from "../form/SortSelector";
import MintDatePicker from "../form/MintDatePicker";
import { Divider } from "antd";
import FilterSliders from "./FilterSliders";
import NameInput from "../form/NameInput";

export default function Filters() {
  return (
    <div className="filters">
      <div className="wrapper">
        <IconText
          color="var(--secondary)"
          icon={<BiSortAlt2 size={16} />}
          text={<h3 style={{ color: "var(--secondary)" }}>Sort</h3>}
        />
        <Divider />
        <SortSelector />
        <IconText
          color="var(--secondary)"
          icon={<IoFilter size={16} />}
          text={<h3 style={{ color: "var(--secondary)" }}>Filter</h3>}
        />
        <Divider />

        <IconText
          color="var(--primary-text)"
          icon={<AiOutlineClockCircle size={14} />}
          text={<p>Mint Date</p>}
        />
        <MintDatePicker />
        <NameInput />

        <FilterSliders />
      </div>
      <div className="footer">
        Updates and Feedback:
        <a target="_blank" rel="noreferrer" href="https://twitter.com/jaidharo">
          <IconText color="var(--primary)" icon={<IoLogoTwitter />} text={<p>@jaidharo</p>} />
        </a>
      </div>
    </div>
  );
}
