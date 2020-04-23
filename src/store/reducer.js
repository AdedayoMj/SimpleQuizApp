import { combineReducers } from "redux";
import { AuthReducer as auth } from "../components/Main/modules/auth";

export const makeRootReducer = () => {
  return combineReducers({
    auth
  });
};

export default makeRootReducer;
