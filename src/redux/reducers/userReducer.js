import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userList : []
}

const userReducer = createSlice({
    name : 'userReducer',
    initialState,
    reducers : {
        addUser : (state , { type , payload }) => 
        ({
            ...state,
            userList : payload
        })
    }
})

export const { addUser } = userReducer.actions;
export default userReducer.reducer