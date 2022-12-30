import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timeSheetData : []
}

const timeSheetReducer = createSlice({
    name : 'timeSheetReducer',
    initialState,
    reducers : {
        setTimeSheetData : (state , { type , payload }) => ({
            ...state,
            timeSheetData : payload
        })
    }
})

export const { setTimeSheetData } = timeSheetReducer.actions;
export default timeSheetReducer.reducer