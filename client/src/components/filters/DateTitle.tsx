import { Space } from "antd";
import React from "react";
import { setEndDate, setStartDate } from "../../redux/filters";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "./Filters.css";

export default function DateTitle() {
  const { startDate, endDate } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  let selected: "upcoming" | "all" | "week" = "all";
  if (startDate) {
    selected = "upcoming";
  }
  if (startDate && endDate) {
    selected = "week";
  }

  function setWeek() {
    dispatch(setStartDate(new Date().toString()));
    const nextWeek = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
    dispatch(setEndDate(nextWeek.toString()));
  }

  function setUpcoming() {
    dispatch(setStartDate(new Date().toString()));
    dispatch(setEndDate(undefined));
  }
  function setAll() {
    dispatch(setStartDate(undefined));
    dispatch(setEndDate(undefined));
  }

  return (
    <Space className="date-title" size="middle">
      <h1
        onClick={setUpcoming}
        style={{ cursor: "pointer", color: selected !== "upcoming" ? "var(--gray-0)" : undefined }}
      >
        Upcoming mints
      </h1>
      <h1
        onClick={setWeek}
        style={{ cursor: "pointer", color: selected !== "week" ? "var(--gray-0)" : undefined }}
      >
        This week
      </h1>
      <h1
        onClick={setAll}
        style={{ cursor: "pointer", color: selected !== "all" ? "var(--gray-0)" : undefined }}
      >
        All collections
      </h1>
    </Space>
  );
}
