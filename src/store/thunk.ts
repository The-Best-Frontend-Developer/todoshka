import {deleteTodo, addTodo} from "./Reducers/todoReducer.ts";
import {Status} from "../TypeTodo.ts";
import {AppThunk} from "./store.ts";
import {deleteAllItems} from "./Reducers/translateItemsReducer.ts";

export const moveItemsThunk = (to: Status): AppThunk => (dispatch, getState) => {
    const state = getState().translateItems;

    state.forEach((el) => {
        dispatch(deleteTodo({id: el.id, status: el.status}));
        dispatch(addTodo({...el, status: to}));
        dispatch(deleteAllItems())
    });
};