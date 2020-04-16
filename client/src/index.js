import React from "react";
import ReactDOM from "react-dom";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import App from "./components/App";
//could have imported this anywhere in the project wouldnt have mattered.
import axios from "axios";
window.axios = axios; //allow use of axios in front end termunal
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
console.log("The app is in:", process.env.NODE_ENV);

console.log(process.env.REACT_APP_STRIPE_KEY);
