import React from "react";
import Stat from "./Stat";
import { IoLogoTwitter } from "react-icons/io5";

type Props = { project: Project };

export default function StatsRow({ project }: Props) {
  return (
    <>
      <Stat
        icon={
          <a
            style={{ display: "flex", justifyContent: "center" }}
            target="_blank"
            rel="noreferrer"
            href={project.twitterUrl}
          >
            <IoLogoTwitter color={"#1DA1F2"} size={"14px"} />
          </a>
        }
        current={project.twitterFollowers}
        change={project.trends!.followingChange}
        percentage={project.trends!.followingPercentChange}
      />
    </>
  );
}
