import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface SubmitCollectionState {
  project?: Project;
  resetForm?: boolean;
}

// Define the initial state using that type
const initialState: SubmitCollectionState = {};

export const submitCollectionSlice = createSlice({
  name: "submitCollection",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSubmittedProject: (state, action: PayloadAction<Project | undefined>) => {
      state.project = action.payload;
    },

    setResetForm: (state, action: PayloadAction<boolean>) => {
      state.resetForm = action.payload;
    },
  },
});

export const { setSubmittedProject, setResetForm } = submitCollectionSlice.actions;
