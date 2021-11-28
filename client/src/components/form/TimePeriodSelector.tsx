import { Radio, RadioChangeEvent, Tooltip } from "antd";
import { setTrendType } from "../../redux/filters";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function TimePeriodSelector() {
  const trendType = useAppSelector((state) => state.filters.trendType);
  const lastMoment = useAppSelector((state) => state.projects.aggregation.lastMoment);

  // get dates for comparison to disable field
  const today = new Date();
  const d = new Date(lastMoment);
  const dayAgo = new Date();
  const weekAgo = new Date();
  const monthAgo = new Date();
  dayAgo.setDate(today.getDate() - 1);
  weekAgo.setDate(today.getDate() - 7);
  monthAgo.setDate(today.getDate() - 30);

  const dispatch = useAppDispatch();
  const fillWidth = { width: "calc(25% - var(--padding-small))" };

  function onChange(change: RadioChangeEvent) {
    dispatch(setTrendType(change.target.value));
  }
  return (
    <Radio.Group
      style={{ textAlign: "center", margin: "var(--padding-small)" }}
      onChange={onChange}
      value={trendType}
      buttonStyle="solid"
    >
      <Radio.Button style={fillWidth} disabled={d > dayAgo} value="dayTrend">
        <Tooltip color="var(--primary)" title={d > dayAgo ? "No data available yet" : ""}>
          1D
        </Tooltip>
      </Radio.Button>
      <Radio.Button style={fillWidth} disabled={d > weekAgo} value="weekTrend">
        <Tooltip color="var(--primary)" title={d > weekAgo ? "No data available yet" : ""}>
          1W
        </Tooltip>
      </Radio.Button>
      <Radio.Button style={fillWidth} disabled={d > monthAgo} value="monthTrend">
        <Tooltip color="var(--primary)" title={d > monthAgo ? "No data available yet" : ""}>
          1M
        </Tooltip>
      </Radio.Button>

      <Radio.Button style={fillWidth} value="allTrend">
        Max
      </Radio.Button>
    </Radio.Group>
  );
}
