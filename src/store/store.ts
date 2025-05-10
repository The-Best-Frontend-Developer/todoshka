import {configureStore} from "@reduxjs/toolkit";
import todoReducer from "./Reducers/todoReducer.ts";
import modalReducer from "./Reducers/modalReducer.ts";
import activeItemReducer from "./Reducers/activeItemReducer.ts";
import translateItemsReducer from "./Reducers/translateItemsReducer.ts";
import {ThunkAction} from '@reduxjs/toolkit';
import {Action} from 'redux';
import FirstLastElementIndexesReducer from "./Reducers/FirstLastElementIndexesReducer.ts";
import rotateReducer from "./Reducers/rotateReducer.ts";
import statisticsReducer from "./Reducers/statisticsReducer.ts";
import tagsReducer from "./Reducers/tagsReducer.tsx";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        modal: modalReducer,
        activeItem: activeItemReducer,
        translateItems: translateItemsReducer,
        indexes: FirstLastElementIndexesReducer,
        rotate: rotateReducer,
        statistics: statisticsReducer,
        tags: tagsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type dispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;