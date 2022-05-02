import { Space } from "antd";

type Props = {
  current: number;
  change: number;
  percentage: number;
  icon: JSX.Element;
};
export default function Stat({ current, change, percentage, icon }: Props) {
  function getChangeString(change: number, percent: number): String {
    return `${change >= 0 ? "+" : "-"}${percent?.toLocaleString() || 0}%`;
  }

  function getChangeStyle(change: number): Object {
    let color = "var(--gray-1)";
    if (change > 0) color = "var(--green)";
    if (change < 0) color = "var(--red)";

    return { color };
  }
  return (
    <Space align="center">
      {icon}
      <p>{current?.toLocaleString()}</p>
      <span style={getChangeStyle(change)}>{getChangeString(change, percentage)}</span>
    </Space>
  );
}
