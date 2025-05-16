import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./store/myHook.ts";
import {setTodoSelected} from "./store/Reducers/todoReducer.ts";
import {useLocation} from "react-router-dom";
import {setDeletedTodoSelected} from "./store/Reducers/deletedTodosReducer.ts";

const statuses = ['waiting', 'progress', 'done'] as const;

export const SelectionSync = () => {
    const dispatch = useAppDispatch();
    const translateItems = useAppSelector(state => state.translateItems);
    const deletedTodos = useAppSelector(state => state.deleted)
    const todosByStatus = useAppSelector(state => state.todo);
    const location = useLocation()

    useEffect(() => {
        const selectedIds = translateItems.map(item => item.id);

        if (!location.pathname.includes('deleted-todos')) {
            statuses.forEach((status) => {
                todosByStatus[status].forEach((todo) => {
                    const isSelected = selectedIds.includes(todo.id);
                    dispatch(setTodoSelected({
                        id: todo.id,
                        status,
                        selected: isSelected,
                    }));
                })
            });
        } else {
            deletedTodos.forEach((todo) => {
                const isSelected = selectedIds.includes(todo.id);
                dispatch(setDeletedTodoSelected({
                    id: todo.id,
                    selected: isSelected,
                }));
            })
        }
    }, [translateItems, dispatch, todosByStatus, location.pathname, deletedTodos]);

    return null;
};
