import { Select } from "antd";

export default function SortSelector() {
  return (
    <Select bordered={false} defaultValue="releaseDate">
      <Select.Option value="releaseDate">Release Date </Select.Option>
      <Select.Option value="twitterFollowers">Twitter Followers </Select.Option>
      <Select.Option value="twitterAverageTweetEngagement">Tweets Average Likes</Select.Option>
      <Select.Option value="name">Name </Select.Option>
      <Select.Option value="trends.followingChange">Following Change </Select.Option>
      <Select.Option value="trends.engagementChange">Tweet Average Likes Change </Select.Option>
      <Select.Option value="trends.followingPercentChange">Following % Change </Select.Option>
      <Select.Option value="trends.engagementPercentChange">
        Tweet Average Likes % Change
      </Select.Option>
    </Select>
  );
}
