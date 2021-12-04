import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { setHighlightedProject } from "../../redux/actionCreators";

type Props = { project: Project };
export default function ShowGraphButton({ project }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.status.loading);

  return (
    <Button
      loading={loading}
      onClick={() => dispatch(setHighlightedProject(project))}
      type="primary"
    >
      View Trends
    </Button>
  );
}
