import { useEffect, useRef } from "react";
import Column from "./Column.tsx";
import {Status} from "../TypeTodo.ts";

const HomePage = () => {
    const status = ['waiting', 'progress', 'done']

    const names = ['Запланировано', 'В процессе...', 'Выполнено'];

    const rootRef = useRef<HTMLDivElement>(null!);
    const containerRefs = [
        useRef<HTMLDivElement>(null!),
        useRef<HTMLDivElement>(null!),
        useRef<HTMLDivElement>(null!)
    ];
    const contentRefs = [
        useRef<HTMLDivElement>(null!),
        useRef<HTMLDivElement>(null!),
        useRef<HTMLDivElement>(null!)
    ];

    useEffect(() => {
        const headerHeight = 60;

        const updateRootHeight = () => {
            if (!rootRef.current) return;
            const newHeight = window.innerHeight - headerHeight;
            rootRef.current.style.height = `${newHeight}px`;
        };

        updateRootHeight(); // первичная установка
        window.addEventListener('resize', updateRootHeight);

        return () => {
            window.removeEventListener('resize', updateRootHeight);
        };
    }, []);

    return (
        <div
            ref={rootRef}
            className="flex justify-center gap-5 px-[clamp(1.875rem,_1.1607rem_+3.5714vw,_4.375rem)] py-5"
        >
            {containerRefs.map((ref, i: number) => <Column containerRef={ref} contentRef={contentRefs[i]} key={Math.random()} name={names[i]} status={status[i] as Status}/>)}
        </div>
    );
};

export default HomePage;
