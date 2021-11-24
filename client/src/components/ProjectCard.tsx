import { Card } from "antd";
import React from "react";
import { Project } from "../../models";

type Props = { project: Project };
export default function ProjectCard({ project }: Props) {
  function getChangeString(change: Number, percent: Number): String {
    if (change === 0) {
      return "0";
    }
    return `${change > 0 ? "+" : ""} ${change} (${percent}%)`;
  }

  function getChangeStyle(change: Number): Object {
    let color = "black";
    if (change > 0) color = "green";
    if (change < 0) color = "red";

    return { color };
  }

  function getDateFromString(date: string | undefined) {
    if (!date) {
      return date;
    }
    return new Date(date).toDateString();
  }

  function covertAvatar(avatar: string): string {
    if (avatar.endsWith("png")) {
      return avatar.split("_normal.png")[0] + ".png";
    }
    if (avatar.endsWith("jpg")) {
      return avatar.split("_normal.jpg")[0] + ".jpg";
    }
    return "";
  }

  return (
    <Card>
      <p>{project.name}</p>
      <img src={covertAvatar(project.avatar)} />
      <p>{getDateFromString(project.releaseDate)}</p>
      <p style={getChangeStyle(project.trends!.followingChange)}>
        {getChangeString(project.trends!.followingChange, project.trends!.followingPercentChange)}
      </p>
    </Card>
  );
}
