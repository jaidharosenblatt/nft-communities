import { IoHeartOutline } from "react-icons/io5";
import FilterSlider from "../form/FilterSlider";
import IconText from "../util/IconText";
import { GoMention } from "react-icons/go";
import { BsPeople } from "react-icons/bs";
import { useAppSelector } from "../../redux/hooks";

export default function FilterSliders() {
  const aggregation = useAppSelector((state) => state.projects.aggregation);
  return (
    <>
      <IconText color="var(--primary-text)" icon={<BsPeople size={14} />} text={<p>Followers</p>} />
      <FilterSlider step={100} max={aggregation.highestFollowersRounded} />
      <IconText
        color="var(--primary-text)"
        icon={<IoHeartOutline size={14} />}
        text={<p>Average Likes per Tweet</p>}
      />
      <FilterSlider step={100} max={aggregation.highestTweetLikesRounded} />
      <IconText
        color="var(--primary-text)"
        icon={<GoMention size={14} />}
        text={<p>Average Likes per Mention</p>}
      />
      <FilterSlider step={10} max={aggregation.highestMentionLikesRounded} />
    </>
  );
}
