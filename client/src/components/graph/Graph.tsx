import "./Graph.css";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useAppSelector } from "../../redux/hooks";
import { Skeleton } from "antd";

export default function Graph() {
  const data = useAppSelector((state) => state.graph.data);

  if (!data) {
    return <Skeleton />;
  }

  function formatDate(date: any) {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  function formatTooltipDate(date: any) {
    const d = new Date(date);
    return d.toLocaleDateString("en-US");
  }

  function formatTooltip(value: number, name: string, props: any) {
    return ["followers", value.toLocaleString()];
  }

  return (
    <AreaChart width={450} height={250} data={data}>
      <defs>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis tickFormatter={formatDate} dataKey="date" />
      <YAxis domain={[(dataMin: number) => (dataMin < 200 ? 0 : dataMin - 200), "auto"]} />
      <CartesianGrid vertical={false} />
      <Tooltip labelFormatter={formatTooltipDate} formatter={formatTooltip} />
      <Area
        type="monotone"
        dataKey="value"
        stroke="var(--primary)"
        fillOpacity={1}
        fill="url(#colorPv)"
      />
    </AreaChart>
  );
}
