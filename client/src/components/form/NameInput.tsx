import { Input } from "antd";
import { ChangeEvent } from "react";
import { HiOutlineIdentification } from "react-icons/hi";
import { setNameFilter } from "../../redux/filters";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import IconText from "../util/IconText";
export default function NameInput() {
  const name = useAppSelector((state) => state.filters.name);
  const dispatch = useAppDispatch();

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setNameFilter(e.target.value));
  }
  return (
    <>
      <IconText
        color="var(--primary-text)"
        icon={<HiOutlineIdentification size={14} />}
        text={<p> Name</p>}
      />
      <Input
        style={{
          margin: "var(--padding-filters)",
          width: "calc(100% - var(--padding-filters) - var(--padding-filters))",
        }}
        value={name}
        onChange={onChange}
      />
    </>
  );
}
