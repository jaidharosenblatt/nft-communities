type Props = { caption: string; change: number; percentage: number };
export default function Stat({ caption, change, percentage }: Props) {
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
    <div className="info">
      <p className="caption"> {caption}</p>
      <p style={getChangeStyle(change)}>{getChangeString(change, percentage)}</p>
    </div>
  );
}
