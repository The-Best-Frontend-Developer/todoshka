import {createSlice} from "@reduxjs/toolkit";

type Todo = {
    title: string,
    description: string,
    status?: string
}

type InitialState = [Todo[], Todo[], Todo[]]

const initialState: InitialState = [
    [JSON.parse(localStorage.getItem('waiting') || '{}')],
    [JSON.parse(localStorage.getItem('progress') || '{}')],
    [JSON.parse(localStorage.getItem('done') || '{}')]
]

const todoReducer = createSlice({
    name: 'todo',
    initialState,
    reducers: {
    }
})

// export const {addTodo} = todoReducer.actions;
export default todoReducer.reducer