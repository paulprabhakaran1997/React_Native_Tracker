import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedUser : {}
}

const loginReducer = createSlice({
    name : 'loginReducer',
    initialState,
    reducers : {
        setLoggedUser : (state , { type , payload }) => ({
            ...state,
            loggedUser : payload
        })
    }
})

export const { setLoggedUser } = loginReducer.actions;
export default loginReducer.reducer