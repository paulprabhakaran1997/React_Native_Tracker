import { createSlice } from "@reduxjs/toolkit";

const isTimeStarted = false;

const second = 0;
const timer =  '00 : 00 : 00';

const isActive = false;

const startTime = null;
const stopTime = null;


export const startStopTimerReducer = createSlice({
    name : 'startStopTimerReducer',
    initialState : isTimeStarted,
    reducers : {
        setTimeStarted : (state , { type , payload }) => payload
    }
});


export const secondReducer = createSlice({
    name : 'secondReducer',
    initialState : second,
    reducers : {
        setSecond : (state , { type , payload }) => payload
    }
});

export const timerReducer = createSlice({
    name : 'timerReducer',
    initialState : timer,
    reducers : {
        setTimer : (state , { type , payload }) => payload
    }
});

export const isActiveReducer = createSlice({
    name : 'isActiveReducer',
    initialState : isActive,
    reducers : {
        setIsActive : (state , { type , payload }) => payload
    }
});

export const startTimeReducer = createSlice({
    name : 'startTimeReducer',
    initialState : startTime,
    reducers : {
        setStartTime : (state , { type , payload }) => payload
    }
});

export const stopTimeReducer = createSlice({
    name : 'stopTimeReducer',
    initialState : stopTime,
    reducers : {
        setStopTime : (state , { type , payload }) => payload
    }
});

export const { setTimeStarted } = startStopTimerReducer.actions;
export const { setSecond } = secondReducer.actions;
export const { setTimer } = timerReducer.actions;
export const { setIsActive } = isActiveReducer.actions;
export const { setStartTime } = startTimeReducer.actions;
export const { setStopTime } = stopTimeReducer.actions;