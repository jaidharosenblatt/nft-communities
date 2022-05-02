import { Space } from "antd";

type Props = {
  current: number | string;
  href: string;
  icon: JSX.Element;
};
export default function Stat({ current, href, icon }: Props) {
  return (
    <Space style={{ cursor: "pointer" }} onClick={() => window.open(href)} align="center">
      <span style={{ display: "flex", justifyContent: "center" }}>{icon}</span>
      <p>{current?.toLocaleString()}</p>
    </Space>
  );
}
