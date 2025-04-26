import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type State = "vertical" | "horizontal"
const getRotate = localStorage.getItem("rotate") as State
const initialState: State = getRotate || "horizontal"

const rotateReducer = createSlice({
    name: 'rotate',
    initialState,
    reducers: {
        changeRotate: (_, action: PayloadAction<State>) => {
            localStorage.setItem("rotate", action.payload)
            return action.payload
        }
    }
})

export const {changeRotate} = rotateReducer.actions;
export default rotateReducer.reducer;

