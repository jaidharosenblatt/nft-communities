import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ProjectsState {
  loading: boolean;
  darkMode: boolean;
}

// Define the initial state using that type
const initialState: ProjectsState = {
  loading: true,
  darkMode: localStorage.getItem("mode") === "dark",
};

export const statusSlice = createSlice({
  name: "status",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = statusSlice.actions;
