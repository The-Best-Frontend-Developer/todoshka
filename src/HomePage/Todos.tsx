import {useAppDispatch, useAppSelector} from "../store/myHook.ts";
import {Status} from '../TypeTodo.ts'
import {deleteTodo} from "../store/todoReducer.ts";
import {openChangeModal, openCreateModal} from "../store/modalReducer.ts";
import {useState} from "react";

const Todos = ({status, index}: { status: Status, index: number }) => {
    const dispatch = useAppDispatch()
    const todos = useAppSelector(state => state.todo)
    const [isDragging, setIsDragging] = useState(false)

    return (
        (todos[status].length === 0 && index === 0) ? (
                <div className="flex flex-col mt-10 justify-center gap-3 items-center rounded-3xl p-3 bg-hover select-none shadowItem">
                    <h2>Пока пусто...</h2>
                    <button className="p-2 bg-extra hover:bg-main rounded-2xl shadowItem"
                        onClick={() => dispatch(openCreateModal(status))}
                    >Создайте первую задачу
                    </button>
                </div>) :
            todos[status].map((el) => (
                <div key={el.id} className={`
                    flex flex-col relative shrink-0 px-4 pr-8 py-2 min-h-20
                    bg-second rounded-2xl shadowItem
                    wrap-break-word ${isDragging ? 'cursor-grabbing absolute' : '!cursor-grab'}`}
                     onMouseDown={() => setIsDragging(true)}
                     onMouseUp={() => setIsDragging(false)}
                >
                    <button className="absolute right-2 top-2 stroke-text"
                        onClick={() => dispatch(deleteTodo({id: el.id, status}))}
                    >
                        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="4"
                                y="4"
                                width="40"
                                height="40"
                                rx="10"
                                stroke-width="2"
                                fill="none"
                            />
                            <line x1="16" y1="16" x2="32" y2="32" stroke-width="2" />
                            <line x1="32" y1="16" x2="16" y2="32" stroke-width="2" />
                        </svg>

                    </button>
                    <button className="absolute right-2 bottom-2" title="подробнее" onClick={() => dispatch(openChangeModal(el))}>
                        <svg className="stroke-text fill-text" width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="4"
                                y="4"
                                width="40"
                                height="40"
                                rx="10"
                                stroke-width="2"
                                fill="none"
                            />
                            <circle cx="16" cy="24" r="2"/>
                            <circle cx="24" cy="24" r="2" />
                            <circle cx="32" cy="24" r="2" />
                        </svg>
                    </button>
                    <h3 className="text-lg select-none line-clamp-2">{el.title.length > 35 ? el.title.slice(0, 35) + '...': el.title}</h3>
                    <p className="text-sm select-none leading-[90%] whitespace-pre-wrap line-clamp-6">{el.description}</p>
                </div>
            ))
    );
};

export default Todos;