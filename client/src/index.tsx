import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ReactGA from "react-ga";

ReactGA.initialize("UA-153136152-2");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
