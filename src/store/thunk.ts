import {addTodo, deleteTodo} from "./Reducers/todoReducer.ts";
import {Status} from "../TypeTodo.ts";
import {AppThunk} from "./store.ts";
import {addItem, changeStatus, deleteAllItems} from "./Reducers/translateItemsReducer.ts";
import {addDoneTodos, deleteDoneTodos} from "./Reducers/statisticsReducer.ts";

export const moveItemsThunk = (to: Status, skipClear: boolean = false): AppThunk => (dispatch, getState) => {
    const state = getState().translateItems;

    state.forEach((el) => {
        if (to === "done") {
            dispatch(addDoneTodos())
        } else if (state[0].status === "done") {
            dispatch(deleteDoneTodos())
        }

        dispatch(deleteTodo({id: el.id, status: el.status}));
        dispatch(addTodo({...el, status: to}));
    });

    dispatch(deleteAllItems());

    if (skipClear) {
        state.forEach((el) => {
            dispatch(addItem(el))
        })
    }

    dispatch(changeStatus(to))
};