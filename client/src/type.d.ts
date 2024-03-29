interface Project {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  momentLastUpdate?: string;
  releaseDate?: string;
  name: string;
  description?: string;
  twitter: string;
  discord?: string;
  quantity?: string;
  price?: string;
  website?: string;
  twitterUrl: string;
  discordUrl?: string;
  twitterCreatedAt: string;
  twitterId: string;
  avatar: string;
  twitterFollowers: number;
  discordMembers?: number;
  discordActiveMembers?: number;
  trends: Trend;
  __v?: number;
}

interface Moment {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  project: string;
  twitterFollowers: number;
  twitterAverageMentionEngagement: number;
  twitterAverageTweetEngagement: number;
  twitterAverageNTweetEngagement: number;
  twitterAverageEngagement: number;
  __v: number;
}

enum timeEnum {
  day = "day",
  week = "week",
  month = "month",
  all = "all",
}

interface Trend {
  _id: string;
  followingChange: number;
  followingPercentChange: number;
  tweetEngagementChange: number;
  tweetEngagementPercentChange: number;
  tweetMentionChange: number;
  tweetMentionPercentChange: number;
  __v: number;
}

interface Aggregation {
  highestFollowersRounded: number;
  highestTweetLikesRounded: number;
  highestMentionLikesRounded: number;
  lastMoment: string;
  highestPrice: number;
  highestQuantity: number;
}

interface FilterRange {
  $gte?: number;
  $lte?: number;
}

interface ApiHeader {
  hash: string;
  iv: string;
}

type ApiError = {
  isAxios?: boolean;
  code?: number;
  message?: string;
};

interface GraphResponse {
  value: number;
  date: string;
}

type GraphField =
  | "twitterFollowers"
  | "twitterAverageMentionEngagement"
  | "twitterAverageTweetEngagement";

type MintDateParams = "startDate" | "endDate";
