import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ProjectsState {
  projects: Project[];
  count: number;
  aggregation: Aggregation;
  skip: number;
  limit: number;
}

// Define the initial state using that type
const initialState: ProjectsState = {
  projects: [],
  count: 0,
  aggregation: {
    lastMoment: new Date().toString(),
    highestFollowersRounded: 0,
    highestTweetLikesRounded: 0,
    highestMentionLikesRounded: 0,
    highestPrice: 0,
    highestQuantity: 0,
  },
  skip: 0,
  limit: 20,
};

export const projectsSlice = createSlice({
  name: "projects",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setAggregation: (state, action: PayloadAction<Aggregation>) => {
      state.aggregation = action.payload;
    },
    setSkip: (state, action: PayloadAction<number>) => {
      state.skip = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
});

export const { setProjects, setCount, setAggregation, setSkip, setLimit } = projectsSlice.actions;
