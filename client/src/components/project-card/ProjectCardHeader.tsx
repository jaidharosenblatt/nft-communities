import Socials from "./Socials";
import DateTopper from "./DateTopper";
import TwitterImage from "./TwitterImage";

type Props = { project: Project };
export default function ProjectCardHeader({ project }: Props) {
  const truncatedN = 28;

  const truncatedName =
    project.name.length > truncatedN ? project.name.slice(0, truncatedN - 3) + "..." : project.name;

  const quantity = project.quantity && parseInt(project.quantity).toLocaleString();

  return (
    <div className="header">
      <DateTopper date={project.releaseDate} />
      <TwitterImage project={project} />
      <div className="text">
        <div>
          <a target="_blank" rel="noreferrer" href={project.website}>
            <h2 style={{ textDecoration: "underline", cursor: "pointer" }}>{truncatedName}</h2>
          </a>

          <p>
            {project.price !== undefined && `${project.price} SOL mint | `}
            {quantity !== undefined && `${quantity} supply`}
          </p>
          <Socials project={project} />
        </div>
      </div>
    </div>
  );
}
