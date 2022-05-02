import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { setHighlightedProject } from "../../redux/actionCreators";
import { AiOutlineStock } from "react-icons/ai";
import IconText from "../util/IconText";

type Props = { project: Project };
export default function ShowGraphButton({ project }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.status.loading);

  return (
    <Button
      type="primary"
      loading={loading}
      onClick={() => dispatch(setHighlightedProject(project))}
    >
      <IconText color="white" icon={<AiOutlineStock />} text={<p>Trends</p>} />
    </Button>
  );
}
