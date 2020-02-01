import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Game from "./containers/Game";
import { Provider } from "mobx-react";
import allStores from "./store";

ReactDOM.render(
  <Provider {...allStores}>
    <Game />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
