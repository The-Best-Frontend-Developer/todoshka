import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Status, TypeTodo} from "../../TypeTodo.ts";

type InitialState = {
    openedModal: "create" | "change" | "statistics" | "clear" | null
    status: Status,
    currentTodo: TypeTodo
}

const currentTodo: TypeTodo = {id: Date.now(), title: 'Задача', description: '', status: 'waiting', tags: []}

const initialState: InitialState = {openedModal: null, status: 'waiting', currentTodo}

const modalReducer = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openCreateModal: (state, action: PayloadAction<Status>) => {
            state.openedModal = "create"
            state.status = action.payload
            state.currentTodo = currentTodo
        },
        closeModal: (state) => {
            state.openedModal = null
            state.status = 'waiting'
        },
        openChangeModal: (state, action: PayloadAction<TypeTodo>) => {
            state.openedModal = "change"
            state.currentTodo = action.payload
            state.status = action.payload.status
        },
        openStatisticsModal: (state) => {
            state.openedModal = "statistics"
        },
        openClearModal: (state) => {
            state.openedModal = "clear"
        }
    }
})

export const {openCreateModal, openChangeModal, closeModal, openStatisticsModal, openClearModal} = modalReducer.actions
export default modalReducer.reducer;
