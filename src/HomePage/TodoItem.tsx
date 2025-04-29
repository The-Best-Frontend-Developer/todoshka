import {closeModal, openChangeModal} from "../store/Reducers/modalReducer.ts";
import {deleteTodo} from "../store/Reducers/todoReducer.ts";
import {useAppDispatch, useAppSelector} from "../store/myHook.ts";
import {Status, TypeTodo} from "../TypeTodo.ts";
import {useSortable} from "@dnd-kit/sortable";
import React, {useEffect, useState} from "react";
import {addItem, deleteAllItems, deleteItem} from "../store/Reducers/translateItemsReducer.ts";
import {addDeletedTodos} from "../store/Reducers/statisticsReducer.ts";

type Props = {
    el: TypeTodo,
    status: Status,
    isOverlay?: boolean,
    firstIndex?: number | null,
    setFirstIndex?: React.Dispatch<React.SetStateAction<number | null>>
}

const TodoItem = ({el, status, isOverlay, firstIndex, setFirstIndex}: Props) => {
    const todos = useAppSelector(state => state.todo)
    const translateItems = useAppSelector(state => state.translateItems)
    const dispatch = useAppDispatch()
    const [keyDown, setKeyDown] = useState<"shift" | "ctrl" | "backspace" | "esc" | null>(null)

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
                } else if (e.key === "Escape") {
                    setKeyDown('esc')
                }
            }
        }

        function handleKeyUp() {
            setKeyDown(null)
        }

        function handleClick(e: MouseEvent) {
            const isTodo = (e.target as HTMLElement).closest('.todo-item'); // заменяй на свой класс

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
    }, []);

    useEffect(() => {
        if (keyDown === "backspace") {
            translateItems.forEach((el) => {
                dispatch(deleteTodo({id: el.id, status: el.status}))
                dispatch(addDeletedTodos())
                dispatch(deleteAllItems())
            })
        } else if (keyDown === "esc") {
            dispatch(deleteAllItems())
            dispatch(closeModal())
        }
    }, [keyDown]);

    // НЕ ТРОГАТЬ, ЭТО ДЛЯ ВЫДЕЛЕНИЯ :)

    function handleSelect() {
        const current = todos[status].findIndex(element => element.id === el.id)
        const exists = translateItems.some(item => item.id === el.id)

        if (!keyDown) {
            if (exists) {
                dispatch(deleteAllItems());
                return
            }
            dispatch(deleteAllItems());
            dispatch(addItem(el));
            setFirstIndex?.(current)
        } else if (keyDown === 'shift') {
            if (firstIndex !== null && firstIndex !== undefined) {
                const lastCurrent = todos[status].findIndex(element => element.id === el.id)
                if (lastCurrent !== null) {
                    dispatch(deleteAllItems())

                    const start = Math.min(firstIndex, lastCurrent);

                    const end = Math.max(firstIndex, lastCurrent) + 1;

                    const highlighted = todos[status].slice(start, end);
                    highlighted.forEach((el) => {
                        dispatch(addItem(el))
                    })
                }
            } else {
                setFirstIndex?.(current)
                dispatch(deleteAllItems());
                dispatch(addItem(el));
            }
        } else if (keyDown === 'ctrl') {
            if (todos[status][current].status === translateItems[0].status) {
                if (exists) {
                    dispatch(deleteItem({id: el.id})); // Убираем элемент
                } else {
                    dispatch(addItem(el)); // Добавляем элемент
                }
            }
        }
    }

    return (
        <div
             className={`px-4 py-1.5 sm:py-2.5 min-h-23 h-23 sm:min-h-30 2xl:min-h-35
                ${el.selected ? 'relative before:content-[\'\'] before:absolute ' +
                 'before:left-0 before:top-0 before:w-full before:h-full ' +
                 'before:bg-blue-400 before:opacity-20 before:z-50 before:pointer-events-none' : ''}`}
             onClick={(e) => {
                 e.stopPropagation()
             }}
             ref={setNodeRef}
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
                <div
                    className={`absolute -left-6.5 top-[calc(50%_-_18px)] touch-none fill-text ${isOverlay ? 'opacity-0 cursor-grabbing' : 'cursor-grab noopacity'}`}
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
                <button className="absolute right-2 top-2 stroke-text"
                        onClick={(e) => {
                            dispatch(deleteTodo({id: el.id, status}));
                            dispatch(addDeletedTodos());
                            dispatch(deleteAllItems());
                            e.stopPropagation()
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
                <button className="absolute right-2 bottom-2" title="Подробнее"
                        onClick={(e) => {
                            dispatch(openChangeModal(el));
                            e.stopPropagation()
                        }}
                >
                    <svg className="stroke-text fill-text" width="20" height="20" viewBox="0 0 48 48" fill="none"
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
                </button>

                <h3 className="text-sm lg:text-lg xl:text-xl 2xl:text-2xl line-clamp-2"
                    title={el.title.length > 25 ? el.title : ''}>{el.title.length > 25 ? el.title.slice(0, 25) + '...' : el.title}</h3>
                <p className="text-xs lg:text-sm xl:text-md 2xl:text-lg leading-[100%] sm:leading-[115%] whitespace-pre-wrap line-clamp-3">{el.description}</p>
            </div>
        </div>
    );
};

export default TodoItem;