import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Status, TypeTodo} from "../../TypeTodo.ts";

type InitialState = {
    openedModal: "create" | "change" | "statistics" | "clear" | "delete" | null
    status: Status,
    currentTodo: TypeTodo
}

const currentTodo: TypeTodo = {id: Date.now(), title: 'Задача', description: '', status: 'waiting', tags: []}

const initialState: InitialState = {openedModal: null, status: 'waiting', currentTodo}

const modalReducer = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (
            state,
            action: PayloadAction<{
                type: 'create' | 'change' | 'statistics' | 'clear' | 'delete',
                todo?: TypeTodo,
                status?: Status
            }>
        ) => {
            const { type, todo, status } = action.payload;
            state.openedModal = type;
            if (todo) state.currentTodo = todo;
            state.status = todo?.status ?? status ?? state.status;
        },
        closeModal: (state) => {
            state.openedModal = null;
            state.status = 'waiting';
        }
    }
})

export const {openModal, closeModal} = modalReducer.actions
export default modalReducer.reducer;
