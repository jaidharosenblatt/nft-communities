import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface FiltersState {
  timePeriod: string;
  startDate?: Date;
  endDate?: Date;
}

// Define the initial state using that type
const initialState: FiltersState = {
  timePeriod: "day",
};

export const filtersSlice = createSlice({
  name: "filters",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTimePeriod: (state, action: PayloadAction<string>) => {
      state.timePeriod = action.payload;
    },
    setStartDate: (state, action: PayloadAction<Date>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<Date>) => {
      state.endDate = action.payload;
    },
  },
});

export const { setTimePeriod } = filtersSlice.actions;

export default filtersSlice.reducer;
