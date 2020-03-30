import { authReducer } from "./authReducer";
import { combineReducers } from "redux";
import { BrowserRouter, Route } from "react-router-dom";

export default combineReducers({
  auth: authReducer
});
