type Props = { date?: string };
export default function DateTopper({ date }: Props) {
  function getDateFromString() {
    if (!date) {
      return date;
    }
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const d = new Date(date);
    const diff = d.getTime() - startOfToday.getTime();
    const days = diff / (1000 * 3600 * 24);

    let daysAgo;
    if (days < 0) {
      daysAgo = Math.abs(days).toFixed(0) + " days ago";
    } else if (days === 1) {
      daysAgo = "Tomorrow";
    } else if (days > 0) {
      daysAgo = "In " + days.toFixed(0) + " days";
    } else {
      daysAgo = "Today";
    }

    const formattedDate = d.toLocaleString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return `${daysAgo} (${formattedDate})`;
  }
  return (
    <div className="date-topper">
      <p className="caption">{getDateFromString()}</p>
    </div>
  );
}
