import { Select } from "antd";
import { updateField } from "../../redux/actionCreators";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function FieldSelector() {
  const field = useAppSelector((state) => state.graph.field);
  const dispatch = useAppDispatch();

  function onSelect(value: GraphField) {
    dispatch(updateField(value));
  }

  return (
    <Select style={{ width: "100%" }} value={field} onSelect={onSelect}>
      <Select.Option value="twitterFollowers"> Followers </Select.Option>
      <Select.Option value="twitterAverageTweetEngagement"> Tweet Likes </Select.Option>
      <Select.Option value="twitterAverageMentionEngagement"> Mention Likes </Select.Option>
    </Select>
  );
}
