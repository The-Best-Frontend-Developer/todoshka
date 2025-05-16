import React, {useEffect} from 'react';
import Todos from "./Todos.tsx";
import {Status} from "../TypeTodo.ts";
import {useAppDispatch, useAppSelector} from "../store/myHook.ts";
import {openModal} from "../store/Reducers/modalReducer.ts";
import {rectSortingStrategy, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
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
    const translateItems = useAppSelector(state => state.translateItems)
    const rotate = useAppSelector(state => state.rotate)
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
            const headerHeight = 60;
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
            className={`relative h-full overflow-y-hidden border-hover border-10 bg-extra rounded-xl ${isOver ? 'over' : ''}`}
            ref={containerRef}
        >
            <div className="flex justify-between h-10 px-3 bg-hover">
                <h2 className="text-lg xl:text-2xl">{name}</h2>
                <div className="flex h-full gap-2 items-center">
                    {!(translateItems.length === 0) ? ((index === 0 && translateItems[0].status === "waiting") ? (
                            <>
                                <button className="stroke-text w-4 sm:w-7 aspect-square" onClick={() => dispatch(moveItemsThunk(statuses[1]))}>
                                    <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="24" height="24" rx="5" fill="none" strokeWidth="2"/>
                                        <path d="M10 7 L15 12 L10 17" strokeWidth="2" fill="none" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button className="stroke-text w-4 sm:w-7 aspect-square" onClick={() => {dispatch(moveItemsThunk(statuses[2]))}}>
                                    <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="24" height="24" rx="5" fill="none"
                                              strokeWidth="2"/>
                                        <path d="M8 7 L13 12 L8 17" strokeWidth="2" fill="none" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                        <path d="M14.5 7 L19.5 12 L14.5 17" strokeWidth="2" fill="none"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </>) :
                        (index === 1 && translateItems[0].status === "progress") ? (
                            <>
                                <button className="stroke-text w-4 sm:w-7 aspect-square" onClick={() => dispatch(moveItemsThunk(statuses[0]))}>
                                    <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="24" height="24" rx="5" fill="none"
                                              strokeWidth="2"/>
                                        <path d="M15 7 L10 12 L15 17" strokeWidth="2" fill="none" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button className="stroke-text w-4 sm:w-7 aspect-square" onClick={() => dispatch(moveItemsThunk(statuses[2]))}>
                                    <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="24" height="24" rx="5" fill="none" strokeWidth="2"/>
                                        <path d="M10 7 L15 12 L10 17" strokeWidth="2" fill="none" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </>
                        ) : (index === 2 && translateItems[0].status === "done") ? (
                            <>
                                <button className="stroke-text w-4 sm:w-7 aspect-square" onClick={() => dispatch(moveItemsThunk(statuses[0]))}>
                                    <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="24" height="24" rx="5" fill="none"
                                              strokeWidth="2"/>
                                        <path d="M17.5 7 L12.5 12 L17.5 17" strokeWidth="2" fill="none"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M11 7 L6 12 L11 17" strokeWidth="2" fill="none" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button className="stroke-text w-4 sm:w-7 aspect-square" onClick={() => dispatch(moveItemsThunk(statuses[1]))}>
                                    <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="24" height="24" rx="5" fill="none"
                                              strokeWidth="2"/>
                                        <path d="M15 7 L10 12 L15 17" strokeWidth="2" fill="none" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </>
                        ): null) : null
                    }
                    <button className="stroke-text w-4 sm:w-7 aspect-square" onClick={() => dispatch(openModal({type: "create", status}))}>
                        <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="24" height="24" rx="5" fill="none" strokeWidth="2"/>
                            <line x1="12.5" y1="7" x2="12.5" y2="18" strokeWidth="2" strokeLinecap="round"/>
                            <line x1="7" y1="12.5" x2="18" y2="12.5" strokeWidth="2" strokeLinecap="round"/>
                        </svg>

                    </button>
                </div>
            </div>
            <SortableContext items={todos[status].map(el => el.id)}
                             strategy={rotate === "horizontal" ? verticalListSortingStrategy : rectSortingStrategy}
            >
                <div className="absolute inset-0 top-10 pointer-events-none inset"></div>
                <div className="flex overflow-auto transition-none" ref={contentRef}>
                    <div
                        className={`flex flex-col py-7 px-3 w-full h-full overflow-y-auto overflow-x-hidden scrollbar-custom
                        ${rotate === 'horizontal' ? 'flex flex-col' : `${todos["waiting"].length === 0 ? '' : 'grid lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3'} auto-rows-min`}`}
                    >
                        <Todos status={status} index={index}/>
                    </div>
                </div>
            </SortableContext>
        </div>
    );
};

export default Column;