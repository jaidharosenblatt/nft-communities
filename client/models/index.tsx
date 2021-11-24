export interface Project {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  momentLastUpdate?: Date;
  releaseDate?: Date;
  name: string;
  description?: string;
  twitter: string;
  discord?: string;
  website?: string;
  twitterUrl: string;
  discordUrl?: string;
  twitterId: string;
  avatar: string;
  twitterFollowers: Number;
  twitterAverageMentionEngagement: Number;
  twitterAverageTweetEngagement: Number;
  twitterAverageNTweetEngagement: Number;
  twitterAverageEngagement: Number;
  trends?: any;
  __v: Number;
}

export interface Moment {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  project: string;
  twitterFollowers: Number;
  twitterAverageMentionEngagement: Number;
  twitterAverageTweetEngagement: Number;
  twitterAverageNTweetEngagement: Number;
  twitterAverageEngagement: Number;
  __v: Number;
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
  startFollowers: Number;
  endFollowers: Number;
  followingChange: Number;
  followingPercentChange: Number;
  __v: Number;
}
