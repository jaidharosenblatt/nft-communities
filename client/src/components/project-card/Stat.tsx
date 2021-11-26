import LeftRightRow from "../util/LeftRightRow";

type Props = { caption: string; current: number; change: number; percentage: number };
export default function Stat({ caption, current, change, percentage }: Props) {
  function getChangeString(change: Number, percent: Number): String {
    if (change === 0) {
      return "0";
    }
    return `${change > 0 ? "+" : ""} ${change} (${percent}%)`;
  }

  function getChangeStyle(change: Number): Object {
    let color = "var(--gray-0)";
    if (change > 0) color = "var(--green)";
    if (change < 0) color = "var(--red)";

    return { color };
  }
  return (
    <LeftRightRow
      left={
        <p>
          <span style={{ color: "var(--gray-0)" }}>{caption}:</span> {current?.toLocaleString()}
        </p>
      }
      right={<p style={getChangeStyle(change)}>{getChangeString(change, percentage)}</p>}
    />
  );
}
