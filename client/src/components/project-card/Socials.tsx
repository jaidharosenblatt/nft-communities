import React from "react";
import Stat from "./Stat";
import { IoLogoTwitter, IoLogoDiscord } from "react-icons/io5";
import { Space } from "antd";

type Props = { project: Project };

export default function Socials({ project }: Props) {
  return (
    <Space size="middle">
      <Stat
        href={project.twitterUrl}
        icon={<IoLogoTwitter color={"#1DA1F2"} size={"16px"} />}
        current={project.twitterFollowers}
      />
      {project.discordUrl && (
        <Stat
          href={project.discordUrl}
          icon={<IoLogoDiscord color={"#5865F2"} size={"16px"} />}
          current={project.discordMembers || 0}
        />
      )}
    </Space>
  );
}
