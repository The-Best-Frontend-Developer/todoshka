import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = number | null
const initialState: InitialState = null

type Payload = {id: InitialState}

const activeItemReducer = createSlice({
    name: 'activeItem',
    initialState,
    reducers: {
        setActiveItem: (_, action: PayloadAction<Payload>) => {
            return action.payload.id;
        }
    }
})

export const {setActiveItem} = activeItemReducer.actions
export default activeItemReducer.reducer;