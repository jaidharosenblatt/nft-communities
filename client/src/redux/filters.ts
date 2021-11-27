import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface FiltersState {
  trendType: string;
}

// Define the initial state using that type
const initialState: FiltersState = {
  trendType: "allTrend",
};

export const filtersSlice = createSlice({
  name: "filters",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTrendType: (state, action: PayloadAction<string>) => {
      state.trendType = action.payload;
    },
  },
});

export const { setTrendType } = filtersSlice.actions;
