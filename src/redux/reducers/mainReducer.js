import { combineReducers } from "redux";
import userReducer from "./userReducer";
import loaderReducer from "./loaderReducer";
import loginReducer from "./loginReducer";
import timeSheetReducer from "./timeSheetReducer";
import swiperReducer from "./swiperReducer";
import taskReducer from "./taskReducer";
import { startStopTimerReducer , secondReducer , isActiveReducer , timerReducer ,
     startTimeReducer , stopTimeReducer } from './taskReducer'

export const mainReducer = combineReducers({
    userReducer,
    loaderReducer,
    loginReducer,
    timeSheetReducer,
    swiperReducer,
    startStopTimerReducer : startStopTimerReducer.reducer,
    secondReducer : secondReducer.reducer,
    isActiveReducer : isActiveReducer.reducer,
    timerReducer : timerReducer.reducer,
    startTimeReducer : startTimeReducer.reducer,
    stopTimeReducer : stopTimeReducer.reducer,
})