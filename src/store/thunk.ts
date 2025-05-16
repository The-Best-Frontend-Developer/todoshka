import {addTodo, deleteTodo} from "./Reducers/todoReducer.ts";
import {Status} from "../TypeTodo.ts";
import {AppThunk} from "./store.ts";
import {addItem, changeStatus, deleteAllItems} from "./Reducers/translateItemsReducer.ts";
import {addTodoInBin, totalDeleteTodo} from "./Reducers/deletedTodosReducer.ts";

export const moveItemsThunk = (to: Status, skipClear: boolean = false): AppThunk => (dispatch, getState) => {
    const translateItems = getState().translateItems;

    translateItems.forEach((el) => {
        dispatch(deleteTodo({id: el.id, status: el.status}))
        dispatch(addTodo({...el, status: to}));
    });

    dispatch(changeStatus(to))
    dispatch(deleteAllItems());

    if (skipClear) {
        translateItems.forEach((el) => {
            dispatch(addItem(el))
        })
    }
};

export const deleteTodoThunk = ({id, status}: { id: number; status: Status }): AppThunk => (dispatch, getState) => {
    const state = getState().todo
    const deletedTodos = getState().deleted
    const todos = state[status]
    const target = todos.find(todo => todo.id === id)

    if (!target) return

    const updatedDeletedTodos = [...deletedTodos, target]

    dispatch(deleteTodo({id, status}))
    dispatch(addTodoInBin(target))

    localStorage.setItem('deletedTodos', JSON.stringify(updatedDeletedTodos))
}

export const restoreTodo = (id: number): AppThunk => (dispatch, getState) => {
    const state = getState().todo;
    const deletedTodos = getState().deleted;
    const currentTodo = deletedTodos.find(el => el.id === id);

    if (!currentTodo) return;

    dispatch(addTodo(currentTodo));
    dispatch(totalDeleteTodo(id));

    const updatedTodos = [...state[currentTodo.status], currentTodo];
    localStorage.setItem(currentTodo.status, JSON.stringify(updatedTodos));

    const updatedDeleted = deletedTodos.filter(el => el.id !== id);
    localStorage.setItem('deletedTodos', JSON.stringify(updatedDeleted));
};