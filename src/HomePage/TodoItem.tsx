import {openChangeModal} from "../store/Reducers/modalReducer.ts";
import {deleteTodo} from "../store/Reducers/todoReducer.ts";
import {useAppDispatch} from "../store/myHook.ts";
import {Status, TypeTodo} from "../TypeTodo.ts";
import {useSortable} from "@dnd-kit/sortable";
import React from "react";
import {addItem, deleteAllItems} from "../store/Reducers/translateItemsReducer.ts";

const TodoItem = ({el, status, isOverlay}: { el: TypeTodo, status: Status, isOverlay?: boolean }) => {
    const dispatch = useAppDispatch()

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

    function handleStop(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <div id="item"
             className={`px-4 py-2.5
                ${el.selected ? 'relative before:content-[\'\'] before:absolute ' +
                 'before:left-0 before:top-0 before:w-full before:h-full ' +
                 'before:bg-blue-500 before:opacity-20 before:z-50' : ''}`}
             onClick={(e) => {e.stopPropagation()}}
             ref={setNodeRef}
             style={{
                 transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
                 transition: isOverlay ? 'none' : transition,
             }}
        >
            <div className={`
                    flex flex-col relative shrink-0 px-4 pr-8 py-2 h-23 min-w-10
                    bg-second rounded-2xl shadowItem item outline-none
                    wrap-break-word ${isDragging ? 'opacity-0' : 'noopacity'}`}
                 onClick={(e) => {e.stopPropagation()}}
                 onDoubleClick={() => {
                     dispatch(deleteAllItems());
                     dispatch(addItem(el));
                 }}
            >
                <div
                    className={`absolute -left-6.5 top-[calc(50%_-_18px)] fill-text ${isOverlay ? 'opacity-0 cursor-grabbing' : 'cursor-grab noopacity'}`}
                    {...listeners} {...attributes}
                >
                    <svg version="1.1" width="36" height="36" viewBox="0 0 36 36" preserveAspectRatio="xMidYMid meet"
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
                            handleStop(e)
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

                <h3 className="text-lg select-none line-clamp-2" title={el.title.length > 25 ? el.title : ''}>{el.title.length > 25 ? el.title.slice(0, 25) + '...' : el.title}</h3>
                <p className="text-sm select-none leading-[90%] whitespace-pre-wrap line-clamp-3">{el.description}</p>
            </div>
        </div>
    );
};

export default TodoItem;