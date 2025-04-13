import {configureStore} from "@reduxjs/toolkit";
import todoReducer from "./todoReducer.ts";
import modalReducer from "./modalReducer.ts";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        modal: modalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type dispatch = typeof store.dispatch;