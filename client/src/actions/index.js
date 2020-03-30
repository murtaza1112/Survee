import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  console.log("The data returned", res.data);
  dispatch({ type: FETCH_USER, payload: res.data });
};
