import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { filtersSlice } from "./filters";
import { projectsSlice } from "./projects";

import ReduxThunk from "redux-thunk";
import actionCreators from "./actionCreators";

export const middleware = [ReduxThunk];

const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 25,
});

export const store = configureStore({
  reducer: { projects: projectsSlice.reducer, filters: filtersSlice.reducer },
  middleware,
  enhancers: composeEnhancers,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
