import "./form.css";

type Props = { tag: string | undefined };
export default function Tag({ tag }: Props) {
  if (!tag) return null;
  return <div className="tag">{tag}</div>;
}
