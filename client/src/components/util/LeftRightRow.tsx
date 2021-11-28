type Props = { left: JSX.Element; right: JSX.Element; middle?: JSX.Element };

export default function LeftRightRow({ left, right, middle }: Props) {
  return (
    <div className="left-right-row">
      <div className="left">{left}</div>
      {middle}
      <div className="right">{right}</div>
    </div>
  );
}
