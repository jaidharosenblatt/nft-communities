import { DatePicker } from "antd";
import moment from "moment";
import { Moment } from "moment";
import { AiOutlineArrowRight } from "react-icons/ai";
import { setStartDate, setEndDate } from "../../redux/filters";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function MintDatePicker() {
  const { startDate, endDate } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  // Check the type of this date picker
  const startMomentVal = convertToMoment(startDate);
  const endMomentVal = convertToMoment(endDate);
  // to Moment provide to date picker

  function convertToMoment(val: string | undefined | null): Moment | null {
    if (val) {
      const d = new Date(val);
      return moment(d);
    }
    return null;
  }

  function convertMomentToDateString(m: Moment | null) {
    if (m) {
      return new Date(m.format()).toUTCString();
    }
    return undefined;
  }

  function onChange(m: [Moment | null, Moment | null] | null) {
    if (!m) {
      dispatch(setStartDate(undefined));
      dispatch(setEndDate(undefined));
    } else {
      const [startDate, endDate] = m;
      dispatch(setStartDate(convertMomentToDateString(startDate)));
      dispatch(setEndDate(convertMomentToDateString(endDate)));
    }
  }

  return (
    <DatePicker.RangePicker
      allowEmpty={[true, true]}
      style={{ margin: "var(--padding-filters)" }}
      bordered={true}
      format="MM/DD/YYYY"
      value={[startMomentVal, endMomentVal]}
      onChange={onChange}
      separator={<AiOutlineArrowRight color="#BFBFBF" />}
    />
  );
}
