import { Pagination } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLimit, setSkip } from "../../redux/projects";

export default function PaginationCard() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects);

  function onPageChange(page: number, pageSize: number) {
    dispatch(setSkip(page - 1));
    dispatch(setLimit(pageSize));
  }

  return (
    <Pagination
      onChange={onPageChange}
      pageSize={projects.limit}
      total={projects.count}
      current={projects.skip + 1}
    />
  );
}
