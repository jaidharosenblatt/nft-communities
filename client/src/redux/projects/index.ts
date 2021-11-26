import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ProjectsState {
  projects: Project[];
  count: number;
}

// Define the initial state using that type
const initialState: ProjectsState = {
  projects: [],
  count: 0,
};

export const projectsSlice = createSlice({
  name: "projects",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTimePeriod: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { setTimePeriod } = projectsSlice.actions;
