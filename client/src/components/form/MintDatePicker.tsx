import { DatePicker } from "antd";
import moment from "moment";
import { Moment } from "moment";
import { setStartDate, setEndDate } from "../../redux/filters";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type Props = { filterParam: MintDateParams; label: string };
export default function MintDatePicker({ filterParam, label }: Props) {
  const { startDate, endDate } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  // Check the type of this date picker
  const isStartDate: Boolean = filterParam === "startDate";
  const startMomentVal = convertToMoment(startDate);
  const endMomentVal = convertToMoment(endDate);
  // to Moment provide to date picker
  const momentVal = isStartDate ? startMomentVal : endMomentVal;

  function convertToMoment(val: string | undefined | null): Moment | undefined {
    if (val) {
      const d = new Date(val);
      return moment(d);
    }
    return undefined;
  }

  function onChange(m: Moment | null) {
    let d = undefined;
    if (m) {
      // convert to date then to UTC
      d = new Date(m.format()).toUTCString();
    }
    // might be undefined (allows clear)
    if (isStartDate) {
      dispatch(setStartDate(d));
    } else {
      dispatch(setEndDate(d));
    }
  }

  function disabledDate(current: Moment) {
    // do not allow endDate < startDate
    if (!isStartDate && startMomentVal) return current && current < startMomentVal;
    // do not allow startDate > startDate
    if (isStartDate && endMomentVal) return current && current > endMomentVal;

    return false;
  }

  return (
    <>
      {label}
      <DatePicker
        disabledDate={disabledDate}
        onChange={onChange}
        value={momentVal}
        bordered={false}
        format="MM/DD/YYYY"
      />
    </>
  );
}
