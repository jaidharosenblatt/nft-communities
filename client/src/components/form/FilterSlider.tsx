import { Slider } from "antd";

type Props = { max: number };
export default function FilterSlider({ max }: Props) {
  return (
    <Slider
      style={{ margin: "var(--padding-medium)" }}
      step={10}
      range={true}
      max={max}
      defaultValue={[0, max]}
    />
  );
}
