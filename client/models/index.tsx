export interface Project {
  _id: String;
  createdAt: Date;
  updatedAt: Date;
  momentLastUpdate?: Date;
  releaseDate?: Date;
  name: String;
  description?: String;
  twitter: String;
  discord?: String;
  website?: String;
  twitterUrl: String;
  discordUrl?: String;
  twitterId: String;
  avatar: String;
  twitterFollowers: Number;
  twitterAverageMentionEngagement: Number;
  twitterAverageTweetEngagement: Number;
  twitterAverageNTweetEngagement: Number;
  twitterAverageEngagement: Number;
  __v: Number;
}

export interface Moment {
  _id: String;
  createdAt: Date;
  updatedAt: Date;
  project: String;
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
  _id: String;
  createdAt: Date;
  updatedAt: Date;
  project: String;
  timePeriod: timeEnum;
  startFollowers: Number;
  endFollowers: Number;
  followingChange: Number;
  followingPercentChange: Number;
  __v: Number;
}
