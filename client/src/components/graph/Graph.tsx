import "./Graph.css";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Skeleton } from "antd";
import { useAppSelector } from "../../redux/hooks";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { GRAPH_WIDTH, GRAPH_WIDTH_MOBILE } from "../../constants";

export default function Graph() {
  const { data, field } = useAppSelector((state) => state.graph);
  const { isMobile } = useWindowDimensions();
  if (!data) {
    return <Skeleton />;
  }

  function formatDate(date: any) {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  function formatYAxis(value: number) {
    return value.toLocaleString();
  }

  function formatTooltipDate(date: any) {
    const d = new Date(date);
    return d.toLocaleDateString("en-US");
  }

  function formatTooltip(value: number, name: string, props: any) {
    const fieldMap = {
      twitterFollowers: "Followers",
      twitterAverageMentionEngagement: "Mention Likes",
      twitterAverageTweetEngagement: "Tweet Likes",
    };
    const label = fieldMap[field];
    return [label, value.toLocaleString()];
  }

  return (
    <div className="graph">
      <AreaChart
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        // use hardcoded sizing since Responsive Container doesn't work with hooks :(
        width={isMobile ? GRAPH_WIDTH_MOBILE : GRAPH_WIDTH}
        height={250}
        data={data}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis tickFormatter={formatDate} dataKey="date" />
        <YAxis tickFormatter={formatYAxis} domain={[(dataMin: number) => dataMin, "auto"]} />
        <CartesianGrid vertical={false} />
        <Tooltip labelFormatter={formatTooltipDate} formatter={formatTooltip} />
        <Area
          animationDuration={500}
          type="monotone"
          dataKey="value"
          stroke="var(--primary)"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </div>
  );
}
