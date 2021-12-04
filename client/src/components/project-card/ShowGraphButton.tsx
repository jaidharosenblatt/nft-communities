import { Button, Skeleton } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { setIsVisible } from "../../redux/graph";
export default function ShowGraphButton() {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector((state) => state.graph.isVisible);

  return (
    <Button onClick={() => dispatch(setIsVisible(!isVisible))} type="primary">
      View Trends
    </Button>
  );
}
