import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);
  console.log("The data returned", res.data);
  dispatch({ type: FETCH_USER, payload: res.data });
};
//use history object to redirect on completion

export const submitSurvey = (values, history) => async (dispatch) => {
  console.log(values);
  const res = await axios.post("/api/surveys", values);
  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get("/api/surveys");

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const submitDraft = (draft, history) => async (dispatch) => {
  const res = await axios.post("/api/forms/submit", draft);
  history.push("/forms");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateDraft = (draft, history) => async (dispatch) => {
  const res = await axios.post("/api/forms/update", draft);
  history.push("/forms");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const deleteDraft = (draft) => async (dispatch) => {
  console.log(draft);
  const res = await axios.post("/api/forms/delete", draft);
  console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};
