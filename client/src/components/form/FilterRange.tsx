import { InputNumber } from "antd";
import {
  FiltersState,
  setFollowersFilter,
  setMentionLikesFilter,
  setTweetLikesFilter,
} from "../../redux/filters";
import { useAppDispatch } from "../../redux/hooks";
import LeftRightRow from "../util/LeftRightRow";

type Props = {
  filters: FiltersState;
  value: "twitterAverageTweetEngagement" | "twitterFollowers" | "twitterAverageMentionEngagement";
  max: number;
};
export default function FilterSlider({ filters, value, max }: Props) {
  const filter = filters[value];
  const dispatch = useAppDispatch();

  // add commas
  function formatter(val: number | undefined): string {
    if (val) {
      const nf = new Intl.NumberFormat("en-US");
      return nf.format(val);
    }
    return "";
  }

  // combines $lte and $gte into new filter obj
  function onMinChange(val: number | null) {
    dispatchChange({ ...filter, $gte: val || undefined });
  }
  function onMaxChange(val: number | null) {
    dispatchChange({ ...filter, $lte: val || undefined });
  }

  function dispatchChange(f: FilterRange) {
    // remove undefined values for "$gte" and "$lte"
    let noUndefinedFilter: FilterRange | undefined = {};
    if (f.$gte !== undefined) noUndefinedFilter.$gte = f.$gte;
    if (f.$lte !== undefined) noUndefinedFilter.$lte = f.$lte;
    // make undefined if obj is empty
    if (Object.keys(noUndefinedFilter).length === 0) noUndefinedFilter = undefined;

    switch (value) {
      case "twitterFollowers":
        dispatch(setFollowersFilter(noUndefinedFilter));
        break;
      case "twitterAverageTweetEngagement":
        dispatch(setTweetLikesFilter(noUndefinedFilter));
        break;
      default:
        dispatch(setMentionLikesFilter(noUndefinedFilter));
        break;
    }
  }
  return (
    <div style={{ margin: "var(--padding-filters)" }}>
      <LeftRightRow
        middle={<p style={{ color: "var(--gray-2)" }}>to</p>}
        left={
          <InputNumber
            onChange={onMinChange}
            formatter={formatter}
            controls={false}
            max={max}
            value={filter?.$gte}
            placeholder="Min"
          />
        }
        right={
          <InputNumber
            onChange={onMaxChange}
            formatter={formatter}
            controls={false}
            max={max}
            value={filter?.$lte}
            placeholder="Max"
          />
        }
      />
    </div>
  );
}
