import { Space } from "antd";

type Props = {
  current: number;
  href: string;
  icon: JSX.Element;
};
export default function Stat({ current, href, icon }: Props) {
  return (
    <Space align="center">
      <a
        style={{ display: "flex", justifyContent: "center" }}
        target="_blank"
        rel="noreferrer"
        href={href}
      >
        {icon}
      </a>
      <p>{current?.toLocaleString()}</p>
    </Space>
  );
}
