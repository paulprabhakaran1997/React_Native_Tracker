import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : true
}

const loaderReducer = createSlice({
    name : 'loaderReducer',
    initialState,
    reducers : {
        showLoader : (state , { type , payload }) => ({
            ...state,
            isLoading : true
        }),
        hideLoader : (state , { type , payload }) => ({
            ...state,
            isLoading : false
        }),
    }
})

export const { showLoader , hideLoader } = loaderReducer.actions;
export default loaderReducer.reducer



