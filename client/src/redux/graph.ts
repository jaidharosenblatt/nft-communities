import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface GraphState {
  project?: Project;
  data?: GraphResponse[];
  field: GraphField;
  loading: boolean;
}

// Define the initial state using that type
const initialState: GraphState = { field: "twitterFollowers", loading: false };

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
    setGraphLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setGraphLoading, setGraphProject, setGraphData, setField } = graphSlice.actions;
