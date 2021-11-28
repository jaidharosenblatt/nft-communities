import { InputNumber } from "antd";
import LeftRightRow from "../util/LeftRightRow";

type Props = { max: number; step: number };
export default function FilterSlider({ max, step }: Props) {
  return (
    <div style={{ margin: "var(--padding-filters)" }}>
      <LeftRightRow
        middle={<p>To</p>}
        left={<InputNumber placeholder="Min" />}
        right={<InputNumber placeholder="Max" />}
      />
    </div>
    // <Slider
    //   style={{ margin: "var(--padding-medium)" }}
    //   step={step}
    //   range={true}
    //   max={max}
    //   defaultValue={[0, max]}
    // />
  );
}
