import {useEffect, useRef} from "react";
import Column from "./Column.tsx";
import {Status} from "../TypeTodo.ts";
import {closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {moveTodo} from "../store/Reducers/todoReducer.ts";
import {useAppDispatch} from "../store/myHook.ts";
import {setActiveItem} from "../store/Reducers/activeItemReducer.ts";
import {restrictToParentElement, restrictToVerticalAxis} from "@dnd-kit/modifiers";

const HomePage = () => {
    const dispatch = useAppDispatch()

    const status: Status[] = ['waiting', 'progress', 'done']
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
            console.log(window.innerHeight)
            console.log(newHeight)
            rootRef.current.style.height = `${newHeight}px`;
            console.log(rootRef.current.style.height)
        };

        updateRootHeight(); // первичная установка
        window.addEventListener('resize', updateRootHeight);

        return () => {
            window.removeEventListener('resize', updateRootHeight);
        };
    }, []);

    const sensors = useSensors(useSensor(PointerSensor))

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        // Проверяем, что элемент был перемещен в другой статус
        if (over && active.id !== over.id) {
            // Ищем индекс перемещенного элемента и индекса куда его перетащили
            const from = Number(active.id); // ID элемента, который перетаскиваем
            const to = Number(over.id); // ID элемента, на который перетаскиваем

            // Диспатчим экшен для обновления порядка
            dispatch(moveTodo({ from, to }));
        }
    };

    return (
        <DndContext
            modifiers={[restrictToParentElement, restrictToVerticalAxis]}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={(e) => {
                const id = Number(e.active.id)
                dispatch(setActiveItem({id}));
            }}
            onDragEnd={(e) => {handleDragEnd(e); dispatch(setActiveItem({id: null}))}}
        >
            <div
                ref={rootRef}
                className="grid grid-cols-3 justify-center gap-4 px-[clamp(1.875rem,_1.1607rem_+3.5714vw,_4.375rem)] py-5"
            >
                {containerRefs.map((ref, i: number) => <Column containerRef={ref} contentRef={contentRefs[i]}
                                                               key={Math.random()} name={names[i]}
                                                               status={status[i]} index={i}/>)}
            </div>
        </DndContext>
    );
};

export default HomePage;
