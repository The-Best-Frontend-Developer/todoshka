import {useAppDispatch, useAppSelector} from "../store/myHook.ts";
import TodoItem from "../HomePage/TodoItem.tsx";
import {totalDeletedTodosClear} from "../store/Reducers/deletedTodosReducer.ts";
import {useEffect, useState} from "react";
import {restoreTodo} from "../store/thunk.ts";

const DeletedTodosPage = () => {
    const dispatch = useAppDispatch()
    const translateItems = useAppSelector(state => state.translateItems)
    const deletedTodos = useAppSelector(state => state.deleted)
    const [firstIndex, setFirstIndex] = useState<number | null>(null)
    const [isAllSelected, setIsAllSelected] = useState(false)

    useEffect(() => {
        if (deletedTodos.every(deleted => translateItems.some(item => item.id === deleted.id))) {
            setIsAllSelected(true)
        } else {
            setIsAllSelected(false)
        }

    }, [deletedTodos, translateItems]);

    return (
        <div className="py-10">
            <div
                className="w-[min(90vw,_2500px)] bg-hover rounded-xl justify-self-center overflow-hidden border-solid p-2 border-hover">
                <div className="flex justify-between items-center bg-hover px-3 py-2">
                    <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl">Корзина</h3>
                    {deletedTodos.length !== 0 &&
                        <div className="flex gap-2">
                            <button
                                className={`p-0.5 sm:p-1.5 max-h-min sm:max-h-none bg-extra rounded-lg duration-150 ${isAllSelected ? "shadowItem shadowItem need-animate" : ''}`}
                                onMouseEnter={(e) => e.currentTarget.classList.add("miniInset")}
                                onMouseLeave={(e) => e.currentTarget.classList.remove("miniInset")}
                                onClick={() => {
                                    deletedTodos.forEach((el) => dispatch(restoreTodo(el.id)))
                                }}
                            >
                                <span className="text-[10px] sm:text-xl lg:text-lg leading-[1]">Восстановить все</span>
                            </button>
                            <button
                                className={`p-0.5 sm:p-1.5 max-h-min sm:max-h-none bg-extra rounded-lg duration-150 ${isAllSelected ? "shadowItem shadowItem need-animate" : ''}`}
                                onMouseEnter={(e) => e.currentTarget.classList.add("miniInset")}
                                onMouseLeave={(e) => e.currentTarget.classList.remove("miniInset")}
                                onClick={() => dispatch(totalDeletedTodosClear())}
                            >
                                <span className="text-[10px] sm:text-xl lg:text-lg">Удалить все</span>
                            </button>
                        </div>
                    }
                </div>
                <div
                    className={`bg-extra w-full p-2 rounded-b-lg lg:p-5 grid lg:grid-cols-1 ${deletedTodos.length !== 0 && "xl:grid-cols-2 2xl:grid-cols-3 auto-rows-min"} miniInset`}>
                    {deletedTodos.length !== 0 ?
                        <>
                            {deletedTodos.map((el) => (
                                <TodoItem key={el.id} el={el} status={el.status} deleted={true} firstIndex={firstIndex}
                                          setFirstIndex={setFirstIndex}/>
                            ))}
                        </> :
                        <div className="flex gap-5 items-center mx-auto p-4">
                            <svg className="stroke-hover w-5 md:w-6 lg:w-8 aspect-square"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                            <span className="text-sm sm:text-xl md:text-2xl lg:text-3xl">В корзине нет задач</span>
                            <svg className="stroke-hover w-5 md:w-6 lg:w-8 aspect-square"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
        ;
};

export default DeletedTodosPage;