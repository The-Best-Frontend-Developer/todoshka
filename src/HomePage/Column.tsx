import React, {useEffect} from 'react';
import Todos from "./Todos.tsx";
import {Status} from "../TypeTodo.ts";
import {useAppDispatch, useAppSelector} from "../store/myHook.ts";
import {openCreateModal} from "../store/Reducers/modalReducer.ts";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {useDroppable} from "@dnd-kit/core";
import {moveItemsThunk} from "../store/thunk.ts";

type Props = {
    containerRef: React.RefObject<HTMLDivElement>,
    contentRef: React.RefObject<HTMLDivElement>,
    name: string,
    status: Status,
    index: number
}

const Column = ({containerRef, contentRef, name, status, index}: Props) => {
    const todos = useAppSelector(state => state.todo)
    const dispatch = useAppDispatch()
    const statuses: Status[] = ['waiting', "progress", "done"];

    const {isOver} = useDroppable({
        id: status,
    });


    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;

        if (!container || !content) return;

        const updateHeight = () => {
            const headerHeight = 60; // h-10 = 2.5rem = 40px
            const totalHeight = container.offsetHeight;
            content.style.height = `${totalHeight - headerHeight}px`;
        };

        updateHeight();

        const resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(container);

        return () => resizeObserver.disconnect();
    }, [containerRef, contentRef]);

    return (
        <div
            className={`relative w-full h-full overflow-y-hidden border-hover border-10 bg-extra rounded-xl ${isOver ? 'over' : ''}`}
            ref={containerRef}
        >
            <div className="flex justify-between h-10 px-3 bg-hover">
                <h2 className="text-2xl select-none">{name}</h2>
                <div className="flex h-full gap-0.5 items-center">
                    {index === 0 ? (
                            <>
                                <button className="stroke-text" onClick={() => dispatch(moveItemsThunk(statuses[1]))}>
                                    <svg width="24" height="24" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="24" height="24" rx="5" fill="none" strokeWidth="2"/>
                                        <path d="M10 7 L15 12 L10 17" strokeWidth="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <button>
                                </button>
                            </>) :
                        index === 1 ? (<>
                            <button>
                            </button>
                            <button>
                            </button>
                        </>) : (<>
                            <button>
                            </button>
                            <button>
                            </button>
                        </>)
                    }
                    <button onClick={() => dispatch(openCreateModal(status))}>
                        <svg className="stroke-text" xmlns="http://www.w3.org/2000/svg" width="26" height="26"
                             viewBox="0 0 32 32" fill="none"
                        >
                            <rect
                                x="2"
                                y="2"
                                width="28"
                                height="28"
                                rx="6"
                                strokeWidth="2"
                            />
                            <line
                                x1="16"
                                y1="10"
                                x2="16"
                                y2="22"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <line
                                x1="10"
                                y1="16"
                                x2="22"
                                y2="16"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <SortableContext items={todos[status].map(el => el.id)}
                             strategy={verticalListSortingStrategy}
            >
                <div className="absolute inset-0 top-10 pointer-events-none inset"></div>
                <div className="flex overflow-auto transition-none" ref={contentRef}>
                    <div
                        className="flex flex-col py-7 px-3 w-full h-full overflow-y-auto overflow-x-hidden scrollbar-custom">
                        <Todos status={status} index={index}/>
                    </div>
                </div>
            </SortableContext>
        </div>
    );
};

export default Column;