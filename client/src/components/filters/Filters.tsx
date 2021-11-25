import { Collapse, DatePicker, Radio, Space } from "antd";
import { IoFilter } from "react-icons/io5";
import TimePeriodSelector from "../form/TimePeriodSelector";
import IconText from "../util/IconText";
import "./Filters.css";
export default function Filters() {
  const { Panel } = Collapse;

  return (
    <div className="filters">
      <div className="wrapper">
        <Collapse ghost bordered={false}>
          <p>Time Period</p>

          <IconText
            color="var(--primary-text)"
            icon={<IoFilter size={18} />}
            text={<h2>Filter</h2>}
          />
          <Panel header="Release Date" key="0">
            <DatePicker />
          </Panel>
          <Panel header="Trends" key="1">
            <DatePicker />
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}
