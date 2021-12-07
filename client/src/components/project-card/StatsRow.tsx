import { Divider } from "antd";
import React from "react";
import Stat from "./Stat";

type Props = { project: Project };

export default function StatsRow({ project }: Props) {
  return (
    <>
      <Stat
        caption="Followers"
        current={project.twitterFollowers}
        change={project.trends!.followingChange}
        percentage={project.trends!.followingPercentChange}
      />
      <Divider style={{ margin: "var(--padding-small)" }} />

      <Stat
        caption="Average Likes/Tweet"
        current={project.twitterAverageTweetEngagement!}
        change={project.trends!.tweetEngagementChange}
        percentage={project.trends!.tweetEngagementPercentChange}
      />
      <Divider style={{ margin: "var(--padding-small)" }} />

      <Stat
        caption="Average Likes/Mention"
        current={project.twitterAverageMentionEngagement!}
        change={project.trends!.tweetMentionChange}
        percentage={project.trends!.tweetMentionPercentChange}
      />
    </>
  );
}
