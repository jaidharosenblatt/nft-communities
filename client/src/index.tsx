import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ThemeSelector from "./themes/ThemeSelector";

ReactDOM.render(
  <React.StrictMode>
    <ThemeSelector isDark={false}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeSelector>
  </React.StrictMode>,
  document.getElementById("root")
);
