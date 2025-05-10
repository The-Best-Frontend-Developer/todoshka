import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Tag} from "../../TypeTodo.ts";

const initialState: Tag[] = JSON.parse(localStorage.getItem('recentTags') || '[]')

const tagsReducer = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        addRecentTag: (state, action: PayloadAction<Tag>)=> {
            state.push(action.payload)
            localStorage.setItem('recentTags', JSON.stringify(state))
        },
        deleteRecentTag: (state, action: PayloadAction<string>) => {
            const filtered = state.filter((el) => el.name !== action.payload)
            localStorage.setItem('recentTags', JSON.stringify(filtered))
            return filtered
        },
        updateRecentTags: (state) => {
            state.shift()
            localStorage.setItem('recentTags', JSON.stringify(state))
        }
    }
})

export const {addRecentTag, deleteRecentTag, updateRecentTags} = tagsReducer.actions
export default tagsReducer.reducer