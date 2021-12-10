import Socials from "./Socials";
import ShowGraphButton from "../graph/ShowGraphButton";
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
          <h2>{truncatedName}</h2>
          <p>
            {project.price !== undefined && `${project.price} SOL mint | `}
            {quantity !== undefined && `${quantity} supply`}
          </p>
          <Socials size={30} project={project} />
          <ShowGraphButton project={project} />
        </div>
      </div>
    </div>
  );
}
