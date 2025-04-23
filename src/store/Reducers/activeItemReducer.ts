import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type State = number | null;
type InitialState = {id: State}

const initialState: InitialState = {id: null}

const activeItemReducer = createSlice({
    name: 'activeItem',
    initialState,
    reducers: {
        setActiveItem: (_, action: PayloadAction<{id: State}>) => action.payload,
    }
})

export const {setActiveItem} = activeItemReducer.actions
export default activeItemReducer.reducer;