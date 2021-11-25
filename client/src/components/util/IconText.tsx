import "./util.css";
import React from "react";
type Props = { icon: JSX.Element; text: JSX.Element; color: string };
export default function IconText({ icon, text, color }: Props) {
  return (
    <div className="icon-text">
      {React.cloneElement(icon, { color })}
      {React.cloneElement(text, { color })}
    </div>
  );
}
