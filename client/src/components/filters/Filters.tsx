import { IoFilter, IoHeartCircleOutline, IoHeartOutline, IoLogoTwitter } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import { AiOutlineClockCircle, AiOutlineStock } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { GoMention } from "react-icons/go";
import IconText from "../util/IconText";
import "./Filters.css";
import SortSelector from "../form/SortSelector";
import TimePeriodSelector from "../form/TimePeriodSelector";
import MintDatePicker from "../form/MintDatePicker";
import { Divider } from "antd";
import FilterSlider from "../form/FilterSlider";
export default function Filters() {
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
        <IconText
          color="var(--primary-text)"
          icon={<BsPeople size={14} />}
          text={<p>Followers</p>}
        />
        <FilterSlider max={10000} />
        <IconText
          color="var(--primary-text)"
          icon={<IoHeartOutline size={14} />}
          text={<p>Average Likes per Tweet</p>}
        />
        <FilterSlider max={1000} />
        <IconText
          color="var(--primary-text)"
          icon={<GoMention size={14} />}
          text={<p>Average Likes per Mention</p>}
        />
        <FilterSlider max={1000} />
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
