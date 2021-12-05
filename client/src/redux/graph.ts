import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface GraphState {
  project?: Project;
  data?: GraphResponse[];
  field: GraphField;
}

// Define the initial state using that type
const initialState: GraphState = { field: "twitterFollowers" };

export const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setGraphProject: (state, action: PayloadAction<Project | undefined>) => {
      state.project = action.payload;
    },
    setGraphData: (state, action: PayloadAction<GraphResponse[]>) => {
      state.data = action.payload;
    },

    setField: (state, action: PayloadAction<GraphField>) => {
      state.field = action.payload;
    },
  },
});

export const { setGraphProject, setGraphData, setField } = graphSlice.actions;
