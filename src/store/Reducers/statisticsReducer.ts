import {createSlice} from "@reduxjs/toolkit";

type InitialState = {createdTodos: number, doneTodos: number, deletedTodos: number}
const savedStatistics = localStorage.getItem("statistics");
const initialState: InitialState = savedStatistics
    ? JSON.parse(savedStatistics)
    : { createdTodos: 0, doneTodos: 0, deletedTodos: 0 };

const statisticsReducer = createSlice({
    name: 'statistics',
    initialState,
    reducers: {
        addCreatedTodos: (state) => {
            state.createdTodos += 1
            localStorage.setItem("statistics", JSON.stringify(state))
        },
        addDoneTodos: (state) => {
            state.doneTodos += 1
            localStorage.setItem("statistics", JSON.stringify(state))
        },
        deleteDoneTodos: (state) => {
            state.doneTodos -= 1
            localStorage.setItem("statistics", JSON.stringify(state))
        },
        addDeletedTodos: (state) => {
            state.deletedTodos += 1
            localStorage.setItem("statistics", JSON.stringify(state))
        },
        deleteStatistics: () => {
            localStorage.removeItem("statistics")
        }
    }
})

export const {addCreatedTodos, addDoneTodos, addDeletedTodos, deleteDoneTodos, deleteStatistics} = statisticsReducer.actions;
export default statisticsReducer.reducer;