import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface FiltersState {
  trendType: string;
  sortBy: string;
  sortDirection: number;
}

// Define the initial state using that type
const initialState: FiltersState = {
  trendType: "allTrend",
  sortBy: "releaseDate",
  sortDirection: 1,
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
  },
});

export const { setSortBy, setTrendType, setSortDirection } = filtersSlice.actions;
