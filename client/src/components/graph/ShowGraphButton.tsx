import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { setHighlightedProject } from "../../redux/actionCreators";

type Props = { project: Project };
export default function ShowGraphButton({ project }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.status.loading);

  return (
    <Button
      type="ghost"
      loading={loading}
      style={{ width: "100%", borderRadius: "0 0 var(--border-radius) var(--border-radius)" }}
      onClick={() => dispatch(setHighlightedProject(project))}
    >
      Trends{" "}
    </Button>
  );
}
