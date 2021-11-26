import { IoLogoTwitter, IoLogoDiscord } from "react-icons/io5";
import { AiOutlineLink } from "react-icons/ai";

import { Project } from "../../models";

type Props = { project: Project; color?: string; size: number };
export default function Socials({ project, color, size }: Props) {
  return (
    <div className="social">
      <a target="_blank" rel="noreferrer" href={project.twitterUrl}>
        <IoLogoTwitter color={color || "#1DA1F2"} size={size + "px"} />
      </a>
      {project.discordUrl && (
        <a target="_blank" rel="noreferrer" href={project.discordUrl}>
          <IoLogoDiscord color={color || "#5865F2"} size={size + "px"} />
        </a>
      )}
      {project.website && (
        <a target="_blank" rel="noreferrer" href={project.website}>
          <AiOutlineLink color={color || "var(--gray-1)"} size={size + "px"} />
        </a>
      )}
    </div>
  );
}
