import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypeTodo} from "../../TypeTodo.ts";

const initialState: TypeTodo[] = JSON.parse(localStorage.getItem('deletedTodos') || '[]')

const deletedTodosReducer = createSlice({
    name: 'deletedTodos',
    initialState,
    reducers: {
        addTodoInBin: (state, action: PayloadAction<TypeTodo>) => {
            state.push(action.payload)
            localStorage.setItem('deletedTodos', JSON.stringify(state))
        },
        setTodoDelete: (state, action: PayloadAction<number>) => {
            const currentTodo = state.find((el) => el.id === action.payload)
            if (currentTodo) {currentTodo.delete = true}
        },
        setDeletedTodoSelected: (state, action: PayloadAction<{ id: number, selected: boolean }>) => {
            const todo = state.find(t => t.id === Number(action.payload.id));
            if (todo) {todo.selected = action.payload.selected}
        },
        totalDeleteTodo: (state, action: PayloadAction<number>) => {
            const todos = state.filter(el => el.id !== action.payload)
            localStorage.setItem('deletedTodos', JSON.stringify(todos))
            return todos
        },
        totalDeletedTodosClear: () => {
            localStorage.setItem('deletedTodos', JSON.stringify([]))
            return []
        }
    }
})

export const {addTodoInBin, totalDeleteTodo, setDeletedTodoSelected, totalDeletedTodosClear, setTodoDelete} = deletedTodosReducer.actions
export default deletedTodosReducer.reducer