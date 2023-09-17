'use client';
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './Features/Counter/counterSlice';
import loginReducer from './Features/Login/loginSlice';
import alertReducer from "./Features/Alert/alertSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        isLoggedIn: loginReducer,
        alert : alertReducer
    }
})
export type RootState = ReturnType <typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
