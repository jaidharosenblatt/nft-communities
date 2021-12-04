import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface GraphState {
  isVisible: boolean;
}

// Define the initial state using that type
const initialState: GraphState = {
  isVisible: false,
};

export const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setIsVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
  },
});

export const { setIsVisible } = graphSlice.actions;
