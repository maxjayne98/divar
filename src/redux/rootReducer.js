import { combineReducers } from "redux";
import sharedSlice from "./shared/slice";
const reducers = combineReducers({ shared: sharedSlice });

export default reducers;
