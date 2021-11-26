import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import ReduxThunk from "redux-thunk";
import actionCreators from "./actionCreators";

export const middleware = [ReduxThunk];

const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 25,
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));

export default store;
