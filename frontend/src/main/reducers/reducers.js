import { combineReducers } from "redux";

import todoReducers from "./todoReducers";

const rootReducer = combineReducers({
  todo: todoReducers,
});

export default rootReducer;
