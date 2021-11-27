import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ProjectsState {
  projects: Project[];
  count: number;
  firstUpdated: string;
}

// Define the initial state using that type
const initialState: ProjectsState = {
  projects: [],
  count: 0,
  firstUpdated: new Date().toString(),
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
    setFirstUpdated: (state, action: PayloadAction<string>) => {
      state.firstUpdated = action.payload;
    },
  },
});

export const { setProjects, setCount, setFirstUpdated } = projectsSlice.actions;
