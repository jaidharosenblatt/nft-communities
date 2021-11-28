import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ProjectsState {
  loading: boolean;
  darkMode: boolean;
}

// Define the initial state using that type
const initialState: ProjectsState = {
  loading: true,
  darkMode: localStorage.getItem("theme") === "dark",
};

export const statusSlice = createSlice({
  name: "status",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setLoading, setDarkMode } = statusSlice.actions;