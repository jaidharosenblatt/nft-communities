type Props = { caption: string; data: string };
export function Info({ caption, data }: Props) {
  <div className="info">
    <p className="caption"> {caption}</p>
    <p>{data}</p>
  </div>;
}
