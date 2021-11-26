import { configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { projectsSlice } from "./projects";
import { AnyAction } from "redux";

export const store = configureStore({ reducer: { projects: projectsSlice.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Used for action creator
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
