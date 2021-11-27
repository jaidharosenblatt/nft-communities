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
  website?: string;
  twitterUrl: string;
  discordUrl?: string;
  twitterId: string;
  avatar: string;
  twitterFollowers: number;
  twitterAverageMentionEngagement?: number;
  twitterAverageTweetEngagement?: number;
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
  highestLikesRounded: number;
  lastMoment: string;
}

type MintDateParams = "startDate" | "endDate";