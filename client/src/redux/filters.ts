import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface FiltersState {
  trendType: string;
  sortBy: string;
  sortDirection: number;
  startDate?: string | null;
  endDate?: string | undefined;
}

// Define the initial state using that type
const initialState: FiltersState = {
  trendType: "allTrend",
  sortBy: "releaseDate",
  sortDirection: 1,
  startDate: new Date().toUTCString(),
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
    setStartDate: (state, action: PayloadAction<string | undefined>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string | undefined>) => {
      state.endDate = action.payload;
    },
  },
});

export const { setSortBy, setTrendType, setSortDirection, setStartDate, setEndDate } =
  filtersSlice.actions;
