'use client';

import { createSlice } from "@reduxjs/toolkit";

export interface loginState {
    value:boolean
}

const initialState : loginState = {
    value :false
}
export const loginSlice = createSlice({
    name:'counter',
    initialState: initialState,
    reducers: {
        setIsLoggedIn : (state,action)=>{state.value = action.payload}
    }
});
export const {setIsLoggedIn} = loginSlice.actions;

export default loginSlice.reducer;