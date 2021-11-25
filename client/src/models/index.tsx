export interface Project {
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
  twitterAverageNTweetEngagement?: number;
  twitterAverageEngagement: number;
  trends: Trend;
  __v?: number;
}

export interface Moment {
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

export interface Trend {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  project: string;
  timePeriod: timeEnum;
  startFollowers: number;
  endFollowers: number;
  followingChange: number;
  followingPercentChange: number;
  engagementChange: number;
  engagementPercentChange: number;
  __v: number;
}
