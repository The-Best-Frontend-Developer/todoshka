import React from "react";
import { useEffect, useRef } from "react";

const HomePage = () => {
    const containerRefs = [useRef<HTMLDivElement>(null!), useRef<HTMLDivElement>(null!), useRef<HTMLDivElement>(null!)];
    const contentRefs = [useRef<HTMLDivElement>(null!), useRef<HTMLDivElement>(null!), useRef<HTMLDivElement>(null!)];
    const names = ['Запланировано', 'В процессе...', 'Выполнено']

    useEffect(() => {
        const observers: ResizeObserver[] = [];

        containerRefs.forEach((containerRef, index) => {
            const container = containerRef.current;
            const content = contentRefs[index].current;

            if (!container || !content) return;

            const updateHeight = () => {
                const headerHeight = 60;
                const totalHeight = container.offsetHeight;
                content.style.height = `${totalHeight - headerHeight}px`;
            };

            updateHeight();

            const resizeObserver = new ResizeObserver(updateHeight);
            resizeObserver.observe(container);
            observers.push(resizeObserver);
        });

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, []);

    const renderColumn = (containerRef: React.RefObject<HTMLDivElement>, contentRef: React.RefObject<HTMLDivElement>, key: number, name: string) => (
        <div
            key={key}
            className="relative w-1/3 h-[83vh] border-hover border-10 bg-extra rounded-xl"
            ref={containerRef}
        >
            <div className="h-10 px-3 bg-hover">
                <h2 className="text-2xl">{name}</h2>
            </div>
            <div className="absolute inset-0 top-10 pointer-events-none inset"></div>
            <div className="flex overflow-auto transition-none" ref={contentRef}>
                <div className="flex flex-col gap-8 p-7 w-full h-full overflow-auto scrollbar-custom">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="min-h-15 bg-second w-full shadowItem rounded-2xl text-center">авацвс</div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex justify-center gap-5 px-[clamp(1.875rem,_1.1607rem_+3.5714vw,_4.375rem)] py-5">
            {containerRefs.map((ref, i) => renderColumn(ref, contentRefs[i], i, names[i]))}
        </div>
    );
};

export default HomePage;
