import {openModal} from "../store/Reducers/modalReducer.ts";
import {deleteTodoTag} from "../store/Reducers/todoReducer.ts";
import {useAppDispatch, useAppSelector} from "../store/myHook.ts";
import {Status, TypeTodo} from "../TypeTodo.ts";
import {useSortable} from "@dnd-kit/sortable";
import React, {useEffect, useRef, useState} from "react";
import {addItem, deleteAllItems, deleteItem} from "../store/Reducers/translateItemsReducer.ts";
import {addDeletedTodos} from "../store/Reducers/statisticsReducer.ts";
import {deleteTodoThunk, restoreTodo} from "../store/thunk.ts";
import {setTodoDelete, totalDeleteTodo} from "../store/Reducers/deletedTodosReducer.ts";

type Props = {
    el: TypeTodo,
    status: Status,
    isOverlay?: boolean,
    firstIndex?: number | null,
    setFirstIndex?: React.Dispatch<React.SetStateAction<number | null>>,
    deleted?: boolean,
}

const TodoItem = ({el, status, isOverlay, firstIndex, setFirstIndex, deleted}: Props) => {
    const todos = useAppSelector(state => state.todo)
    const translateItems = useAppSelector(state => state.translateItems)
    const deletedTodos = useAppSelector(state => state.deleted)
    const dispatch = useAppDispatch()
    const [keyDown, setKeyDown] = useState<"shift" | "ctrl" | "backspace" | null>(null)
    const refNode = useRef<HTMLDivElement | null>(null);

    const combinedRef = (node: HTMLDivElement | null) => {
        setNodeRef(node);
        refNode.current = node;
    };

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: el.id,
        disabled: false,
    });

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if ((e.target as HTMLElement).tagName !== 'INPUT' &&
                (e.target as HTMLElement).tagName !== 'TEXTAREA') {
                if (e.shiftKey) {
                    setKeyDown('shift')
                } else if (e.ctrlKey) {
                    setKeyDown('ctrl')
                } else if (e.key === "Backspace" || e.key === "Delete") {
                    setKeyDown('backspace')
                }
            }
        }

        function handleKeyUp() {
            setKeyDown(null)
        }

        function handleClick(e: MouseEvent) {
            const isTodo = (e.target as HTMLElement).closest('.todo-item');

            if (!isTodo) {
                setFirstIndex?.(null);
            }
        }

        document.addEventListener('click', handleClick)
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
            document.removeEventListener('click', handleClick)
        }
    }, [setFirstIndex]);

    useEffect(() => {
        if (keyDown === "backspace") {
            translateItems.forEach((el) => {
                if (deleted) {
                    dispatch(totalDeleteTodo(el.id))
                } else {
                    dispatch(deleteTodoThunk({id: el.id, status: el.status}))
                }
                dispatch(addDeletedTodos())
                dispatch(deleteAllItems())
            })
        }
    }, [deleted, dispatch, keyDown, translateItems]);

    // НЕ ТРОГАТЬ, ЭТО ДЛЯ ВЫДЕЛЕНИЯ :)

    function handleSelect() {
        const indexInTodos = todos[status].findIndex(element => element.id === el.id);
        const indexInDeleted = deletedTodos.findIndex(element => element.id === el.id);

        const current = deleted ? indexInDeleted : indexInTodos;
        const list = deleted ? deletedTodos : todos[status];

        const exists = translateItems.some(item => item.id === el.id);

        if (!keyDown) {
            if (exists) {
                dispatch(deleteAllItems());
                return;
            }
            dispatch(deleteAllItems());
            dispatch(addItem(el));
            setFirstIndex?.(current);
        } else if (keyDown === 'shift') {
            if (firstIndex !== null && firstIndex !== undefined) {
                const lastCurrent = current;
                if (lastCurrent !== null) {
                    dispatch(deleteAllItems());

                    const start = Math.min(firstIndex, lastCurrent);
                    const end = Math.max(firstIndex, lastCurrent) + 1;

                    const highlighted = list.slice(start, end);
                    highlighted.forEach((el) => {
                        dispatch(addItem(el));
                    });
                }
            } else {
                setFirstIndex?.(current);
                dispatch(deleteAllItems());
                dispatch(addItem(el));
            }
        } else if (keyDown === 'ctrl') {
            const isSameStatus = list[current]?.status === translateItems[0]?.status;

            if (isSameStatus || deleted) {
                if (exists) {
                    dispatch(deleteItem({ id: el.id }));
                } else {
                    dispatch(addItem(el));
                }
            }
        }
    }

    useEffect(() => {
        if (el.animated && refNode) {
            refNode.current?.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }, [el.animated]);

    return (
        <div
            className={`px-4 py-1.5 sm:py-2.5 min-h-23 h-23 sm:min-h-30 2xl:min-h-35
                ${el.animated ? 'animated relative' : ''}
                ${el.selected ? 'relative before:content-[\'\'] before:absolute ' +
                'before:left-0 before:top-0 before:w-full before:h-full ' +
                'before:bg-blue-400 before:opacity-20 before:z-50 before:pointer-events-none' : ''}`}
            onClick={(e) => {
                e.stopPropagation()
            }}
            ref={combinedRef}
            style={{
                transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
                transition: isOverlay ? 'none' : transition,
            }}
        >
            <div className={`
                    flex flex-col relative shrink-0 px-4 pr-8 py-2 h-full
                    bg-second rounded-2xl shadowItem item outline-none
                    wrap-break-word ${isDragging ? 'opacity-0' : 'noopacity'}`}
                 onClick={handleSelect}
            >
                {!deleted &&
                    <div
                        className={`absolute -left-6.5 focus:outline-none top-[calc(50%_-_18px)] touch-none fill-text ${isOverlay ? 'opacity-0 cursor-grabbing' : 'cursor-grab noopacity'}`}
                        {...listeners} {...attributes}
                    >
                        <svg version="1.1" width="36" height="36" viewBox="0 0 36 36"
                             preserveAspectRatio="xMidYMid meet"
                             xmlns="http://www.w3.org/2000/svg">
                            <title>drag-handle-line</title>
                            <circle cx="15" cy="12" r="1.5" className="clr-i-outline clr-i-outline-path-1"></circle>
                            <circle cx="15" cy="24" r="1.5" className="clr-i-outline clr-i-outline-path-2"></circle>
                            <circle cx="21" cy="12" r="1.5" className="clr-i-outline clr-i-outline-path-3"></circle>
                            <circle cx="21" cy="24" r="1.5" className="clr-i-outline clr-i-outline-path-4"></circle>
                            <circle cx="21" cy="18" r="1.5" className="clr-i-outline clr-i-outline-path-5"></circle>
                            <circle cx="15" cy="18" r="1.5" className="clr-i-outline clr-i-outline-path-6"></circle>
                            <rect x="0" y="0" width="36" height="36" fillOpacity="0"/>
                        </svg>
                    </div>
                }
                <div className="flex flex-col h-full">
                    <button className="absolute right-2 top-2 stroke-text"
                            onClick={(e) => {
                                e.stopPropagation()
                                if (!deleted) {
                                    dispatch(deleteTodoThunk({id: el.id, status}));
                                    dispatch(addDeletedTodos());
                                } else {
                                    dispatch(setTodoDelete(el.id))
                                    dispatch(openModal({type: "delete"}))
                                }
                                dispatch(deleteAllItems());
                            }}
                    >
                        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="4"
                                y="4"
                                width="40"
                                height="40"
                                rx="10"
                                strokeWidth="2"
                                fill="none"
                            />
                            <line x1="16" y1="16" x2="32" y2="32" strokeWidth="2"/>
                            <line x1="32" y1="16" x2="16" y2="32" strokeWidth="2"/>
                        </svg>

                    </button>
                    {!deleted ?
                        <button className="absolute right-2 bottom-2" title="Подробнее"
                                onClick={(e) => {
                                    dispatch(openModal({type: "change", todo: el}));
                                    e.stopPropagation()
                                }}
                        >
                            <svg className="stroke-text fill-text" width="20" height="20" viewBox="0 0 48 48"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="4"
                                    y="4"
                                    width="40"
                                    height="40"
                                    rx="10"
                                    strokeWidth="2"
                                    fill="none"
                                />
                                <circle cx="16" cy="24" r="2"/>
                                <circle cx="24" cy="24" r="2"/>
                                <circle cx="32" cy="24" r="2"/>
                            </svg>
                        </button> :
                        <button className="absolute right-2 bottom-2" title="Восстановить" onClick={(e) => {
                            dispatch(restoreTodo(el.id));
                            e.stopPropagation()
                        }}
                        >
                            <svg className="stroke-text" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                 viewBox="0 0 24 24" fill="none">
                                <rect x="1" y="1" width="22" height="22" rx="5" stroke="currentColor" strokeWidth="1"/>
                                <path
                                    d="M8 16a6 6 0 1 1 4.5 2.2"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                />
                                <path d="M12.5 18.2l2 1.5m-2-1.5 2-1.5" stroke="currentColor" strokeWidth="2"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    }

                    <h3 className="text-sm lg:text-lg xl:text-xl 2xl:text-2xl line-clamp-2"
                        title={el.title.length > 25 ? el.title : ''}>{el.title.length > 25 ? el.title.slice(0, 25) + '...' : el.title}</h3>
                    <p className={`text-xs lg:text-sm xl:text-md 2xl:text-lg leading-[100%] sm:leading-[115%] whitespace-pre-wrap ${el.tags.length === 0 ? 'line-clamp-3' : 'line-clamp-2'}`}>{el.description}</p>
                    <div
                        className="flex flex-row shrink-0 gap-1 sm:gap-2 mt-auto max-w-full max-h-20 overflow-x-auto scroll-smooth scrollbar-none">
                        {el.tags.map((tag) => (
                            <div className={`flex items-center bg-extra p-1 gap-1 rounded-lg ${deleted ? 'px-3' : ''}`}
                                 key={tag.id}>
                                <span
                                    className="text-[10px] sm:text-sm leading-[100%] whitespace-nowrap">{tag.name}</span>
                                {!deleted &&
                                    <button className="bg-hover rounded-xl p-0.5"
                                            onClick={(e) => {
                                                dispatch(deleteTodoTag({todoId: el.id, tagId: tag.id}))
                                                e.stopPropagation()
                                            }}
                                    >
                                        <svg className="stroke-text" xmlns="http://www.w3.org/2000/svg" width="10"
                                             height="10"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18"/>
                                            <line x1="6" y1="6" x2="18" y2="18"/>
                                        </svg>
                                    </button>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;