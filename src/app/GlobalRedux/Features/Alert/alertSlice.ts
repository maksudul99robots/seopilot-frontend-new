'use client';

import { createSlice } from "@reduxjs/toolkit";
import { SweetAlertIcon } from "sweetalert2";

export interface alertState {
    title:string,
    icon: SweetAlertIcon,
    showCancelButton: boolean,
    text: string
}

const initialState : alertState = {
    title:'',
    icon: 'success',
    showCancelButton: true,
    text: ''
}

export const alertSlice = createSlice({
    name:'alert',
    initialState: initialState,
    reducers: {
        setAlert : (state,action)=>{
            state.title = action.payload.title,
            state.icon = action.payload.icon,
            state.showCancelButton = action.payload.showCancelButton,
            state.text = action.payload.text
        }
    }
});
export const {setAlert} = alertSlice.actions;

export default alertSlice.reducer;