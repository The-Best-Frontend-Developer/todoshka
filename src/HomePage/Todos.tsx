import {useAppDispatch, useAppSelector} from "../store/myHook.ts";
import {Status} from '../TypeTodo.ts'
import {openCreateModal} from "../store/Reducers/modalReducer.ts";
import TodoItem from "./TodoItem.tsx";
import {SortableContext} from "@dnd-kit/sortable";
import {DragOverlay} from "@dnd-kit/core";
import {useEffect, useState} from "react";
import {updateDoneTodos} from "../store/Reducers/statisticsReducer.ts";

const Todos = ({status, index}: { status: Status, index: number }) => {
    const dispatch = useAppDispatch();
    const todos = useAppSelector(state => state.todo);
    const hasTodos = todos[status] && todos[status].length > 0;

    const [firstIndex, setFirstIndex] = useState<number | null>(null)

    const activeItemId = useAppSelector(state => state.activeItem)
    const activeTodo = todos.waiting.concat(todos.progress, todos.done)
        .find(todo => todo.id === activeItemId.id);

    useEffect(() => {
        dispatch(updateDoneTodos(todos["done"].length))
    }, [todos["done"]]);

    return (
        <>
            {!hasTodos && index === 0 && (
                <div
                    className="flex flex-col w-[min(90%,_400px)] mx-auto mt-10 justify-center gap-3 items-center rounded-3xl p-3 bg-hover shadowItem">
                    <h2>Пока пусто...</h2>
                    <button
                        className="p-2 bg-extra hover:bg-main rounded-2xl shadowItem"
                        onClick={() => dispatch(openCreateModal(status))}
                    >
                        Создайте первую задачу
                    </button>
                </div>
            )}
            {hasTodos && (
                <>
                    <SortableContext items={todos[status].map(el => el.id)}>
                        {todos[status].map((el) => (
                            <TodoItem key={el.id} el={el}
                                      status={status}
                                      firstIndex={firstIndex}
                                      setFirstIndex={setFirstIndex}
                            />
                        ))}
                    </SortableContext>
                    <DragOverlay dropAnimation={null}>
                        {activeTodo ? (
                            <TodoItem el={activeTodo} status={status} isOverlay/>) : null
                        }
                    </DragOverlay>
                </>
            )}
        </>
    );
}

export default Todos;