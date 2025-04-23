import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/myHook.ts";
import { setTodoSelected } from "./store/Reducers/todoReducer.ts";

const statuses = ['waiting', 'progress', 'done'] as const;

export const SelectionSync = () => {
    const dispatch = useAppDispatch();
    const translateItems = useAppSelector(state => state.translateItems);
    const todosByStatus = useAppSelector(state => state.todo);

    useEffect(() => {
        const selectedIds = translateItems.map(item => item.id);

        statuses.forEach((status) => {
            todosByStatus[status].forEach((todo) => {
                const isSelected = selectedIds.includes(todo.id);
                dispatch(setTodoSelected({
                    id: todo.id,
                    status,
                    selected: isSelected,
                }));
            });
        });
    }, [translateItems, dispatch, todosByStatus]);

    return null;
};
