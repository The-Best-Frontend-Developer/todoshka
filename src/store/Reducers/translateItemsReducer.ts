import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TypeTodo} from "../../TypeTodo.ts";

type InitialState = TypeTodo[]
const initialState: InitialState = []

const translateItemsReducer = createSlice({
    name: 'translateItems',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<TypeTodo>) => {
            state.push(action.payload)
        },
        deleteItem: (state, action: PayloadAction<{id: number}>) => {
            const {id} = action.payload;
            return state.filter((el) => el.id !== id)
        },
        deleteAllItems: () => {
            return []
        }
    }
})

export const {addItem, deleteItem, deleteAllItems} = translateItemsReducer.actions
export default translateItemsReducer.reducer;