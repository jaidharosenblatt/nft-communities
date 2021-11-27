import { Select } from "antd";
import { setSortBy, setSortDirection } from "../../redux/filters";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function SortSelector() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const value = `${filters.sortDirection}:${filters.sortBy}`;
  function onChange(change: string) {
    const [sortDirection, sortBy] = change.split(":");
    dispatch(setSortBy(sortBy));
    dispatch(setSortDirection(parseInt(sortDirection)));
  }
  return (
    <Select onChange={onChange} bordered={false} value={value}>
      <Select.Option value="1:releaseDate">Mint Date </Select.Option>
      <Select.Option value="-1:twitterFollowers">Most Twitter Followers </Select.Option>
      <Select.Option value="-1:twitterAverageTweetEngagement">Most Avg Likes/Tweet</Select.Option>
      <Select.Option value="1:name">Name (A-Z)</Select.Option>
      <Select.Option value="-1:name">Name (Z-A)</Select.Option>
      <Select.Option value="-1:trends.followingChange">Followers Growth </Select.Option>
      <Select.Option value="-1:trends.engagementChange">Avg Likes/Tweet Growth</Select.Option>
    </Select>
  );
}
