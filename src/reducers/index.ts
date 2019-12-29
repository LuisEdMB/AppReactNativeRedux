import { combineReducers } from "redux";
import { studentReducer } from "./student/studentReducer";

export const AppReducer = combineReducers({
    student: studentReducer
})