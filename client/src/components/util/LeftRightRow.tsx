type Props = { left: JSX.Element; right: JSX.Element };

export default function LeftRightRow({ left, right }: Props) {
  return (
    <div className="left-right-row">
      <div className="left">{left}</div>
      <div className="right">{right}</div>
    </div>
  );
}
