import LeftRightRow from "../util/LeftRightRow";

type Props = { caption: string; current: number; change: number; percentage: number };
export default function Stat({ caption, current, change, percentage }: Props) {
  function getChangeString(change: Number, percent: Number): String {
    return `${change > 0 ? "+" : ""} ${change || 0} (${percent || 0}%)`;
  }

  function getChangeStyle(change: Number): Object {
    let color = "var(--gray-1)";
    if (change > 0) color = "var(--green)";
    if (change < 0) color = "var(--red)";

    return { color };
  }
  return (
    <LeftRightRow
      left={
        <p>
          {caption}: <span style={{ color: "var(--gray-0)" }}>{current?.toLocaleString()}</span>
        </p>
      }
      right={<p style={getChangeStyle(change)}>{getChangeString(change, percentage)}</p>}
    />
  );
}
