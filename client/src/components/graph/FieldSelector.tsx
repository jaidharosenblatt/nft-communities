import { Select } from "antd";
import { updateField } from "../../redux/actionCreators";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function FieldSelector() {
  const { loading, field } = useAppSelector((state) => state.graph);
  const dispatch = useAppDispatch();

  function onSelect(value: GraphField) {
    dispatch(updateField(value));
  }

  return (
    <Select loading={loading} style={{ width: "100%" }} value={field} onSelect={onSelect}>
      <Select.Option value="twitterFollowers"> Followers </Select.Option>
      <Select.Option value="twitterAverageTweetEngagement"> Tweet Likes </Select.Option>
      <Select.Option value="twitterAverageMentionEngagement"> Mention Likes </Select.Option>
    </Select>
  );
}
