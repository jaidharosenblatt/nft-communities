import { configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { projectsSlice } from "./projects";
import { AnyAction } from "redux";
import { filtersSlice } from "./filters";
import { statusSlice } from "./status";
import { graphSlice } from "./graph";
import { submitCollectionSlice } from "./submitCollection";

export const store = configureStore({
  reducer: {
    projects: projectsSlice.reducer,
    filters: filtersSlice.reducer,
    status: statusSlice.reducer,
    graph: graphSlice.reducer,
    submitCollection: submitCollectionSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Used for action creator
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
