import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Status, TypeTodo} from "../TypeTodo.ts";

type InitialState = {
    waiting: TypeTodo[],
    progress: TypeTodo[],
    done: TypeTodo[]
}

const initialState: InitialState = {
    waiting: JSON.parse(localStorage.getItem('waiting') || '[]'),
    progress: JSON.parse(localStorage.getItem('progress') || '[]'),
    done: JSON.parse(localStorage.getItem('done') || '[]')
}

const todoReducer = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<TypeTodo>) => {
            const {status} = action.payload;
            state[status].push(action.payload)
            localStorage.setItem(status, JSON.stringify(state[status]))
        },
        deleteTodo: (state, action: PayloadAction<{id: number, status: Status}>) => {
            const {id, status} = action.payload;
            state[status] = state[status].filter((el) => el.id !== id)
            localStorage.setItem(status, JSON.stringify(state[status]))
        }
    }
})

export const {addTodo, deleteTodo} = todoReducer.actions;
export default todoReducer.reducer