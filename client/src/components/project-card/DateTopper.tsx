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
    const days = Math.round(diff / (1000 * 3600 * 24));

    let daysAgo;
    if (days < 0) {
      daysAgo = "Minted " + Math.abs(days) + " days ago";
    } else if (days === 1) {
      daysAgo = "Mints tomorrow";
    } else if (days > 0) {
      daysAgo = "Mints in " + days + " days";
    } else {
      daysAgo = "Minting today";
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
