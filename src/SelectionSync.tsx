import { useEffect } from "react";
import { useAppDispatch, useAppSelector} from "./store/myHook.ts";
import { setTodoSelected} from "./store/Reducers/todoReducer.ts";

export const SelectionSync = () => {
    const dispatch = useAppDispatch();
    const translateItems = useAppSelector(state => state.translateItems);
    const todosByStatus = useAppSelector(state => state.todo); // { waiting, progress, done }

    useEffect(() => {
        const selectedIds = translateItems.map(item => item.id);

        // Пройтись по всем тудушкам в каждом статусе
        ['waiting', 'progress', 'done'].forEach((status) => {
            todosByStatus[status].forEach(todo => {
                const isSelected = selectedIds.includes(todo.id);
                dispatch(setTodoSelected({
                    id: todo.id,
                    status: status as keyof typeof todosByStatus,
                    selected: isSelected,
                }));
            });
        });
    }, [translateItems, dispatch, todosByStatus]);

    return null;
};