import { createSlice } from "@reduxjs/toolkit";

const swipeEnabled = true

const swiperReducer = createSlice({
    name : 'swipeReducer',
    initialState : swipeEnabled,
    reducers : {
        enableSwipe : (state , { type , payload }) =>({
            state : payload
        })
    }
});

export const { enableSwipe } = swiperReducer.actions;
export default swiperReducer.reducer