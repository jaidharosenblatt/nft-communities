import { configureStore } from "@reduxjs/toolkit";

import { projectsSlice } from "./projects";

export default configureStore({ reducer: projectsSlice.reducer });
