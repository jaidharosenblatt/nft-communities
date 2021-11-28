import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ProjectsState {
  projects: Project[];
  count: number;
  aggregation: Aggregation;
}

// Define the initial state using that type
const initialState: ProjectsState = {
  projects: [],
  count: 0,
  aggregation: {
    lastMoment: new Date().toString(),
    highestFollowersRounded: 100000,
    highestTweetLikesRounded: 1000,
    highestMentionLikesRounded: 100,
  },
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
  },
});

export const { setProjects, setCount, setAggregation } = projectsSlice.actions;
