import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Status, TypeTodo} from "../../TypeTodo.ts";

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
            const {id, status} = action.payload
            const todos = state[status].filter((el) => el.id !== id)
            state[status] = todos
            localStorage.setItem(status, JSON.stringify(todos))
        },
        updateTodo: (state, action: PayloadAction<{newTodo: TypeTodo, oldStatus: Status}>) => {
            const {id, status} = action.payload.newTodo;
            const {oldStatus} = action.payload

            if (!status) return;

            if (oldStatus !== status) {
                state[oldStatus] = state[oldStatus].filter(todo => todo.id !== id);
                localStorage.setItem(oldStatus, JSON.stringify(state[oldStatus]));
            }

            const existingIndex = state[status].findIndex(todo => todo.id === id);

            if (existingIndex >= 0) {
                state[status][existingIndex] = {
                    ...state[status][existingIndex],
                    ...action.payload.newTodo
                };
            } else {
                state[status].push({
                    ...action.payload.newTodo
                });
            }

            localStorage.setItem(status, JSON.stringify(state[status]));
        },
        moveTodo: (state, action: PayloadAction<{from: number, to: number}>) => {
            const { from, to } = action.payload;
            const statuses: Status[] = ['waiting', 'progress', 'done'];

            for (const status of statuses) {
                const list = state[status];
                const fromIndex = list.findIndex(todo => todo.id === from);
                const toIndex = list.findIndex(todo => todo.id === to);

                if (fromIndex !== -1 && toIndex !== -1) {
                    const [moved] = list.splice(fromIndex, 1);
                    list.splice(toIndex, 0, moved);
                    localStorage.setItem(status, JSON.stringify(state[status]));
                    break;
                }
            }
        },
        setTodoSelected: (
            state,
            action: PayloadAction<{ id: number, status: keyof InitialState, selected: boolean }>
        ) => {
            const todo = state[action.payload.status].find(t => t.id === Number(action.payload.id));
            if (todo) {
                todo.selected = action.payload.selected;
            }
        },
        setTodoAnimated: (state, action: PayloadAction<number>) => {
            const allTodos = [...state.waiting, ...state.progress, ...state.done]
            const currentTodo = allTodos.find((el) => el.id === action.payload);
            if (currentTodo) {currentTodo.animated = true}
        },
        clearTodoAnimated: (state, action: PayloadAction<number>) => {
            const allTodos = [...state.waiting, ...state.progress, ...state.done]
            const currentTodo = allTodos.find((el) => el.id === action.payload)
            if (currentTodo) {
                currentTodo.animated = false;
            }
        },
        deleteTodoTag: (state, action: PayloadAction<{ todoId: number, tagId: number }>) => {
            const { todoId, tagId } = action.payload;
            const statuses: (keyof InitialState)[] = ['waiting', 'progress', 'done'];

            for (const status of statuses) {
                const todoIndex = state[status].findIndex(el => el.id === todoId);
                if (todoIndex !== -1) {
                    const newTags = state[status][todoIndex].tags.filter(tag => tag.id !== tagId);
                    const updatedTodo = {
                        ...state[status][todoIndex],
                        tags: newTags
                    };
                    state[status] = [
                        ...state[status].slice(0, todoIndex),
                        updatedTodo,
                        ...state[status].slice(todoIndex + 1)
                    ];
                    localStorage.setItem(status, JSON.stringify(state[status]));
                    break;
                }
            }
        }
    }
})

export const {addTodo, updateTodo, moveTodo, setTodoSelected, setTodoAnimated, clearTodoAnimated, deleteTodoTag, deleteTodo} = todoReducer.actions;
export default todoReducer.reducer