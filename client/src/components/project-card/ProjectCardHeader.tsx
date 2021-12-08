import Socials from "./Socials";
import NftPlaceholder from "../../static/NftPlaceholder.png";
import { useImage } from "react-image";
import { Suspense } from "react";
import { Skeleton } from "antd";

type Props = { project: Project };
export default function ProjectCardHeader({ project }: Props) {
  const truncatedN = 28;

  const truncatedName =
    project.name.length > truncatedN ? project.name.slice(0, truncatedN - 3) + "..." : project.name;

  const quantity = project.quantity && parseInt(project.quantity).toLocaleString();
  function covertAvatar(avatar: string): string {
    if (!avatar) {
      return NftPlaceholder;
    }
    return avatar.replace("_normal", "");
  }

  function MyImageComponent() {
    const { src } = useImage({
      srcList: [covertAvatar(project.avatar), NftPlaceholder],
    });

    return <img alt={`${project.name} avatar`} src={src} />;
  }

  return (
    <div className="header">
      <Suspense fallback={<Skeleton />}>
        <MyImageComponent />
      </Suspense>
      <div className="text">
        <h2>{truncatedName}</h2>
        <p>
          {project.price !== undefined && `${project.price} SOL mint | `}
          {quantity !== undefined && `${quantity} supply`}
        </p>

        <Socials size={30} project={project} />
      </div>
    </div>
  );
}
