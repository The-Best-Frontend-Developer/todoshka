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
            const {id, status} = action.payload;
            state[status] = state[status].filter((el) => el.id !== id)
            localStorage.setItem(status, JSON.stringify(state[status]))
        },
        updateTodo: (state, action: PayloadAction<{newTodo: TypeTodo, oldStatus: Status}>) => {
            const {id, status} = action.payload.newTodo;
            const {oldStatus} = action.payload

            if (!status) return; // Если статус не указан нигде - выходим

            // Если статус изменился
            if (oldStatus !== status) {
                // Удаляем из старого статуса
                state[oldStatus] = state[oldStatus].filter(todo => todo.id !== id);
                localStorage.setItem(oldStatus, JSON.stringify(state[oldStatus]));
            }

            // Обновляем или добавляем в новый статус
            const existingIndex = state[status].findIndex(todo => todo.id === id);

            if (existingIndex >= 0) {
                // Обновляем существующую задачу
                state[status][existingIndex] = {
                    ...state[status][existingIndex],
                    ...action.payload.newTodo
                };
            } else {
                // Добавляем как новую задачу (если статус изменился)
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
                    const [moved] = list.splice(fromIndex, 1); // Удаляем элемент из исходного места
                    list.splice(toIndex, 0, moved); // Вставляем элемент в новое место
                    break;
                }
            }
        },
        setTodoSelected: (
            state,
            action: PayloadAction<{ id: string, status: keyof InitialState, selected: boolean }>
        ) => {
            const todo = state[action.payload.status].find(t => t.id === Number(action.payload.id));
            if (todo) {
                todo.selected = action.payload.selected;
            }
        }
    }
})

export const {addTodo, updateTodo, deleteTodo, moveTodo, setTodoSelected} = todoReducer.actions;
export default todoReducer.reducer