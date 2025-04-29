import {useEffect, useRef} from "react";
import Column from "./Column.tsx";
import {Status} from "../TypeTodo.ts";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {moveTodo} from "../store/Reducers/todoReducer.ts";
import {useAppDispatch, useAppSelector} from "../store/myHook.ts";
import {setActiveItem} from "../store/Reducers/activeItemReducer.ts";
import {restrictToParentElement, restrictToVerticalAxis} from "@dnd-kit/modifiers";

const HomePage = () => {
        const dispatch = useAppDispatch()
        const rotate = useAppSelector(state => state.rotate)

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
                    if ((window.innerHeight / window.innerWidth > 1 && window.innerHeight / window.innerWidth < 1.7) || window.innerWidth < 640) {
                        rootRef.current.style.height = `${newHeight * 1.5}px`
                    } else if (rotate === "vertical" || window.innerWidth <= 1024) {
                        rootRef.current.style.height = `${newHeight * 3}px`
                    } else if (rotate === "horizontal") {
                        rootRef.current.style.height = `${newHeight}px`;
                    }
                };

                updateRootHeight(); // первичная установка
                window.addEventListener('resize', updateRootHeight);

                return () => {
                    window.removeEventListener('resize', updateRootHeight);
                };
            }, [rotate]
        )
        ;

        const sensors = useSensors(
            useSensor(PointerSensor),  // Для десктопа
            useSensor(TouchSensor)     // Для мобильных устройств
        );

        const handleDragEnd = (event: DragEndEvent) => {
            const {active, over} = event;

            // Проверяем, что элемент был перемещен в другой статус
            if (over && active.id !== over.id) {
                // Ищем индекс перемещенного элемента и индекса куда его перетащили
                const from = Number(active.id); // ID элемента, который перетаскиваем
                const to = Number(over.id); // ID элемента, на который перетаскиваем

                // Диспатчим экшен для обновления порядка
                dispatch(moveTodo({from, to}));
            }
        };

        return (
            <DndContext
                modifiers={[restrictToParentElement, ...(rotate === "horizontal" ? [restrictToVerticalAxis] : [])]}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={(e) => {
                    const id = Number(e.active.id)
                    dispatch(setActiveItem({id}));
                }}
                onDragEnd={(e) => {
                    handleDragEnd(e);
                    dispatch(setActiveItem({id: null}))
                }}
            >
                <div
                    ref={rootRef}
                    className={`grid ${rotate === "vertical" || (window.innerHeight / window.innerWidth > 1.1 && window.innerHeight / window.innerWidth < 1.7) ? 'lg:grid-rows-3 lg:grid-cols-1' : 'lg:grid-cols-3 lg:grid-rows-1'} grid-rows-3 grid-cols-1 justify-center gap-4 px-[clamp(1.875rem,_1.1607rem_+3.5714vw,_4.375rem)] mx-auto max-w-625 py-5`}
                >
                    {containerRefs.map((ref, i: number) => <Column containerRef={ref} contentRef={contentRefs[i]}
                                                                   key={Math.random()} name={names[i]}
                                                                   status={status[i]} index={i}/>)}
                </div>
            </DndContext>
        );
    }
;

export default HomePage;
