import { IoBagOutline, IoHeartOutline, IoPricetagOutline } from "react-icons/io5";
import FilterRange from "../form/FilterRange";
import IconText from "../util/IconText";
import { GoMention } from "react-icons/go";
import { BsPeople } from "react-icons/bs";
import { useAppSelector } from "../../redux/hooks";

export default function FilterSliders() {
  const aggregation = useAppSelector((state) => state.projects.aggregation);
  const filters = useAppSelector((state) => state.filters);

  return (
    <>
      <IconText color="var(--primary-text)" icon={<BsPeople size={14} />} text={<p>Followers</p>} />
      <FilterRange
        filters={filters}
        value="twitterFollowers"
        max={aggregation.highestFollowersRounded}
      />
      <IconText
        color="var(--primary-text)"
        icon={<IoHeartOutline size={14} />}
        text={<p>Average Likes/Tweet</p>}
      />
      <FilterRange
        filters={filters}
        value="twitterAverageTweetEngagement"
        max={aggregation.highestTweetLikesRounded}
      />
      <IconText
        color="var(--primary-text)"
        icon={<GoMention size={14} />}
        text={<p>Average Likes/Mention</p>}
      />
      <FilterRange
        filters={filters}
        value="twitterAverageMentionEngagement"
        max={aggregation.highestMentionLikesRounded}
      />
      <IconText
        color="var(--primary-text)"
        icon={<IoPricetagOutline size={14} />}
        text={<p>Price (SOL)</p>}
      />
      <FilterRange filters={filters} value="price" max={aggregation.highestPrice} />
      <IconText
        color="var(--primary-text)"
        icon={<IoBagOutline size={14} />}
        text={<p>Supply</p>}
      />
      <FilterRange filters={filters} value="quantity" max={aggregation.highestQuantity} />
    </>
  );
}
