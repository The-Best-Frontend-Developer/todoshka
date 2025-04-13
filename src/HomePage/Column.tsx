import React, {useEffect} from 'react';
import Todos from "./Todos.tsx";
import {Status} from "../TypeTodo.ts";
import {useAppDispatch} from "../store/myHook.ts";
import {openCreateModal} from "../store/modalReducer.ts";

type Props = {
    containerRef: React.RefObject<HTMLDivElement>,
    contentRef: React.RefObject<HTMLDivElement>,
    name: string,
    status: Status
}

const Column = ({containerRef, contentRef, name, status}: Props) => {
    const dispatch = useAppDispatch()

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
            className="relative w-1/3 h-full border-hover border-10 bg-extra rounded-xl"
            ref={containerRef}
        >
            <div className="flex justify-between h-10 px-3 bg-hover">
                <h2 className="text-2xl select-none">{name}</h2>
                <button className="mb-2" onClick={() => dispatch(openCreateModal(status))}>
                    <svg className="stroke-second" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32" fill="none"
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
            <div className="absolute inset-0 top-10 pointer-events-none inset"></div>
            <div className="flex overflow-auto transition-none" ref={contentRef}>
                <div className="flex flex-col gap-5 p-7 w-full h-full overflow-auto scrollbar-custom">
                    <Todos status={status}/>
                </div>
            </div>
        </div>
    );
};

export default Column;