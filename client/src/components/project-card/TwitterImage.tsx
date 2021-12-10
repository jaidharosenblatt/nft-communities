import NftPlaceholder from "../../static/NftPlaceholder.png";
import { useImage } from "react-image";
import { Suspense } from "react";
import { Skeleton } from "antd";

type Props = { project: Project };
export default function TwitterImage({ project }: Props) {
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
    <Suspense fallback={<Skeleton />}>
      <MyImageComponent />
    </Suspense>
  );
}
