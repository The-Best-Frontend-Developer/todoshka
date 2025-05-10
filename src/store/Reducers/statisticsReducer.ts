import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
        updateDoneTodos: (state, action: PayloadAction<number>) => {
            state.doneTodos = action.payload
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

export const {addCreatedTodos, addDeletedTodos, deleteStatistics, updateDoneTodos} = statisticsReducer.actions;
export default statisticsReducer.reducer;