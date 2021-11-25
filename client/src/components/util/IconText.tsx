import "./util.css";
import React from "react";
type Props = { icon: JSX.Element; text: string; color: string };
export default function IconText({ icon, text, color }: Props) {
  return (
    <div className="icon-text">
      {React.cloneElement(icon, { color })}

      <p style={{ color }}> {text}</p>
    </div>
  );
}
