import { combineReducers } from "redux";
import { counterReducer } from "./counterReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  // Add imported reducers here
  user: userReducer,
  counter: counterReducer,
});

export default rootReducer;
