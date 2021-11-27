import { Radio, RadioChangeEvent } from "antd";
import { setTrendType } from "../../redux/filters";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function TimePeriodSelector() {
  const trendType = useAppSelector((state) => state.filters.trendType);
  const dispatch = useAppDispatch();

  function onChange(change: RadioChangeEvent) {
    dispatch(setTrendType(change.target.value));
  }
  return (
    <Radio.Group onChange={onChange} value={trendType} buttonStyle="solid">
      <Radio.Button value="dayTrend">1D</Radio.Button>
      <Radio.Button value="weekTrend">1W</Radio.Button>
      <Radio.Button value="monthTrend">1M</Radio.Button>
      <Radio.Button value="allTrend">Max</Radio.Button>
    </Radio.Group>
  );
}
