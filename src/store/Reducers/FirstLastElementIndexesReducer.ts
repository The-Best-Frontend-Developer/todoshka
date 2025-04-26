import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {first: number | null, last: number | null}
const initialState: InitialState = {first: 0, last: 1}

const FirstLastElementIndexesReducer = createSlice({
    name: 'indexes',
    initialState,
    reducers: {
        addFirstIndex: (state, action: PayloadAction<number>) => {
            state.first = action.payload
        },
        addLastIndex: (state, action: PayloadAction<number>) => {
            state.last = action.payload + 1
        },
        deleteIndexes: () => {
            return {first: null, last: null}
        }
    }
})

export const {addFirstIndex, addLastIndex, deleteIndexes} = FirstLastElementIndexesReducer.actions
export default FirstLastElementIndexesReducer.reducer