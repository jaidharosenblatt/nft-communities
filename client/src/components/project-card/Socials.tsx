import { IoBrowsers, IoLogoTwitter, IoLogoDiscord } from "react-icons/io5";
import { Project } from "../../../models";

type Props = { project: Project; color: string; size: number };
export default function Socials({ project, color, size }: Props) {
  return (
    <div className="social">
      <a target="_blank" href={project.twitterUrl}>
        <IoLogoTwitter color={color} size={size + "px"} />
      </a>
      {project.website && (
        <a target="_blank" href={project.website}>
          <IoBrowsers color={color} size={size + "px"} />
        </a>
      )}
      {project.discordUrl && (
        <a target="_blank" href={project.discordUrl}>
          <IoLogoDiscord color={color} size={size + "px"} />
        </a>
      )}
    </div>
  );
}
