import Socials from "./Socials";

type Props = { project: Project };
export default function ProjectCardHeader({ project }: Props) {
  const truncatedN = 28;

  const truncatedName =
    project.name.length > truncatedN ? project.name.slice(0, truncatedN - 3) + "..." : project.name;

  const quantity = project.quantity && parseInt(project.quantity).toLocaleString();
  function covertAvatar(avatar: string): string {
    return avatar.replace("_normal", "");
  }

  return (
    <div className="header">
      <img alt={"Twitter Avatar"} src={covertAvatar(project.avatar)} />
      <div>
        <h2>{truncatedName}</h2>
        <p>
          {project.price !== undefined && `${project.price} SOL mint | `}
          {`${quantity} supply`}
        </p>

        <Socials size={30} project={project} />
      </div>
    </div>
  );
}
