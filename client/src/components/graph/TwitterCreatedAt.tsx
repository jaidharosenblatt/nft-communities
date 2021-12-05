import React from "react";
import { timeAgo } from "../../constants";

type Props = { twitterCreatedAt: string };
export default function TwitterCreatedAt({ twitterCreatedAt }: Props) {
  const d = new Date(twitterCreatedAt);
  const time = timeAgo.format(d);
  const date = d.toLocaleDateString();
  return (
    <p>
      Joined Twitter: <span style={{ color: "var(--gray-0)" }}>{`${date} (${time})`}</span>
    </p>
  );
}
