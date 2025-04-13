import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Status} from "../TypeTodo.ts";

type InitialState = {
    createModal: boolean,
    changeModal: boolean,
    status: Status
}

const initialState: InitialState = {createModal: false, changeModal: false, status: 'waiting'}

const modalReducer = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openCreateModal: (state, action: PayloadAction<Status>) => {
            state.createModal = true;
            state.status = action.payload
        },
        closeModal: (state) => {
            state.createModal = false; state.changeModal = false
            state.status = 'waiting'
        },
        openChangeModal: (state, action: PayloadAction<Status>) => {
            state.changeModal = true
            state.status = action.payload
        }
    }
})

export const {openCreateModal, openChangeModal, closeModal} = modalReducer.actions
export default modalReducer.reducer;
