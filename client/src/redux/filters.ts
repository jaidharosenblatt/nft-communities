import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface FiltersState {
  trendType: string;
  sortBy: string;
  sortDirection: number;
  startDate?: string | null;
  endDate?: string | undefined;
  twitterFollowers?: FilterRange;
  twitterAverageMentionEngagement?: FilterRange;
  twitterAverageTweetEngagement?: FilterRange;
  price?: FilterRange;
  quantity?: FilterRange;
  name?: string;
}

// Define the initial state using that type
const initialState: FiltersState = {
  trendType: "allTrend",
  sortBy: "releaseDate",
  sortDirection: 1,
  startDate: new Date().toUTCString(),
};

export const filtersSlice = createSlice({
  name: "filters",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTrendType: (state, action: PayloadAction<string>) => {
      state.trendType = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<number>) => {
      state.sortDirection = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string | undefined>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string | undefined>) => {
      state.endDate = action.payload;
    },
    setFollowersFilter: (state, action: PayloadAction<FilterRange | undefined>) => {
      state.twitterFollowers = action.payload;
    },
    setTweetLikesFilter: (state, action: PayloadAction<FilterRange | undefined>) => {
      state.twitterAverageTweetEngagement = action.payload;
    },
    setMentionLikesFilter: (state, action: PayloadAction<FilterRange | undefined>) => {
      state.twitterAverageMentionEngagement = action.payload;
    },

    setPriceFilter: (state, action: PayloadAction<FilterRange | undefined>) => {
      state.price = action.payload;
    },
    setQuantityFilter: (state, action: PayloadAction<FilterRange | undefined>) => {
      state.quantity = action.payload;
    },
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const {
  setSortBy,
  setTrendType,
  setSortDirection,
  setStartDate,
  setEndDate,
  setFollowersFilter,
  setTweetLikesFilter,
  setMentionLikesFilter,
  setNameFilter,
  setPriceFilter,
  setQuantityFilter,
} = filtersSlice.actions;
