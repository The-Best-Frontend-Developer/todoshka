import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Status, TypeTodo} from "../../TypeTodo.ts";

type InitialState = {
    createModal: boolean,
    changeModal: boolean,
    status: Status,
    currentTodo: TypeTodo
}

const currentTodo: TypeTodo = {id: Date.now(), title: 'Задача', description: '', status: 'waiting', selected: false}

const initialState: InitialState = {createModal: false, changeModal: false, status: 'waiting', currentTodo}

const modalReducer = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openCreateModal: (state, action: PayloadAction<Status>) => {
            state.createModal = true;
            state.status = action.payload
            state.currentTodo = currentTodo
        },
        closeModal: (state) => {
            state.createModal = false; state.changeModal = false
            state.status = 'waiting'
        },
        openChangeModal: (state, action: PayloadAction<TypeTodo>) => {
            state.changeModal = true
            state.currentTodo = action.payload
            state.status = action.payload.status
        }
    }
})

export const {openCreateModal, openChangeModal, closeModal} = modalReducer.actions
export default modalReducer.reducer;
