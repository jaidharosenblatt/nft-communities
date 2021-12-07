import LeftRightRow from "../util/LeftRightRow";

type Props = { caption: string; current: number; change: number; percentage: number };
export default function Stat({ caption, current, change, percentage }: Props) {
  function getChangeString(change: number, percent: number): String {
    return `${change > 0 ? "+" : ""} ${change?.toLocaleString() || 0} (${
      percent?.toLocaleString() || 0
    }%)`;
  }

  function getChangeStyle(change: number): Object {
    let color = "var(--gray-1)";
    if (change > 0) color = "var(--green)";
    if (change < 0) color = "var(--red)";

    return { color };
  }
  return (
    <div>
      <p> {caption}</p>
      <LeftRightRow
        left={
          <p>
            <span style={{ color: "var(--gray-0)" }}>{current?.toLocaleString()}</span>
          </p>
        }
        right={<p style={getChangeStyle(change)}>{getChangeString(change, percentage)}</p>}
      />
    </div>
  );
}
