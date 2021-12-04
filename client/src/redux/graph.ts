import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface GraphState {
  project?: Project;
}

// Define the initial state using that type
const initialState: GraphState = {};

export const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setGraphProject: (state, action: PayloadAction<Project | undefined>) => {
      state.project = action.payload;
    },
  },
});

export const { setGraphProject } = graphSlice.actions;
