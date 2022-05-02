import { Space } from "antd";
import React from "react";
import { setStartDate } from "../../redux/filters";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function DateTitle() {
  const startDate = useAppSelector((state) => state.filters.startDate);
  const dispatch = useAppDispatch();

  const allDates = startDate !== undefined;
  return (
    <Space>
      <h1
        onClick={() => dispatch(setStartDate(new Date().toString()))}
        style={{ cursor: "pointer", color: !allDates ? "var(--gray-0)" : undefined }}
      >
        Upcoming mints
      </h1>
      <h1
        onClick={() => dispatch(setStartDate(undefined))}
        style={{ cursor: "pointer", color: allDates ? "var(--gray-0)" : undefined }}
      >
        All collections
      </h1>
    </Space>
  );
}
