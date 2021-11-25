import { Radio } from "antd";

export default function TimePeriodSelector() {
  return (
    <Radio.Group defaultValue="a" buttonStyle="solid">
      <Radio.Button value="large">1D</Radio.Button>
      <Radio.Button value="default">1W</Radio.Button>
      <Radio.Button value="small">1M</Radio.Button>
      <Radio.Button value="a">Max</Radio.Button>
    </Radio.Group>
  );
}
