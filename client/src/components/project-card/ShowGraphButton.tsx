import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { setIsVisible } from "../../redux/graph";
export default function ShowGraphButton() {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector((state) => state.graph.isVisible);
  const loading = useAppSelector((state) => state.status.loading);

  return (
    <Button loading={loading} onClick={() => dispatch(setIsVisible(!isVisible))} type="primary">
      View Trends
    </Button>
  );
}
