import { authReducer } from "./authReducer";
import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
//as keyword used to change the name of reducer to reduxForm to make it seem
//less aniguous
//redux form possesses its own reducer
export default combineReducers({
  auth: authReducer,
  form: reduxForm
});
