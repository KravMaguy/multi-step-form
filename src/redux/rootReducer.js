import { combineReducers } from "redux";
import { counterReducer } from "./counterReducer";
import { policyReducer } from "./policyReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  // Add imported reducers here
  policy: policyReducer,
  user: userReducer,
  counter: counterReducer,
});

export default rootReducer;
