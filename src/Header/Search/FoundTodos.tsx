import {useAppDispatch, useAppSelector} from "../../store/myHook.ts";
import {TypeTodo} from "../../TypeTodo.ts";
import * as React from "react";
import {JSX, useMemo} from "react";
import {clearTodoAnimated, setTodoAnimated} from "../../store/Reducers/todoReducer.ts";

type Props = {
    value: string,
    searchRequest: string,
    setIsSearchingNow: React.Dispatch<React.SetStateAction<boolean>>,
    type: string
}

type TotalFilteredTodo = {
    id: number,
    title: string,
    description: string,
    commonInTitle: number,
    commonInDescription: number,
    highlightedTitle: JSX.Element,
    highlightedDescription: JSX.Element
}

const MAX_TITLE_LENGTH = 15;
const MAX_DESC_LENGTH = 53;

const FoundTodos = ({value, searchRequest, setIsSearchingNow, type}: Props) => {
    const dispatch = useAppDispatch()
    const todos = useAppSelector(state => state.todo);

    const allTodos: TypeTodo[] = useMemo(() => [
        ...todos["waiting"],
        ...todos["progress"],
        ...todos["done"],
    ], [todos]);

    // СЧИТАЕТ СОВПАДЕНИЯ

    const countMatches = (text: string): number => {
        if (!searchRequest.trim()) return 0;

        const lowerText = text.toLowerCase();
        const lowerSearch = searchRequest.toLowerCase();
        let count = 0;
        let i = 0;

        while (i < lowerText.length) {
            if (lowerText.startsWith(lowerSearch, i)) {
                count++;
                i += lowerSearch.length;
            } else {
                i++;
            }
        }

        return count;
    };

    const highlightMatches = (
        text: string,
        type: string,
        shouldHighlight: boolean
    ): JSX.Element => {
        const maxLength = type === "title" ? MAX_TITLE_LENGTH : MAX_DESC_LENGTH;
        const visibleText = text.slice(0, maxLength);
        const hiddenText = text.slice(maxLength);

        if (!shouldHighlight || !searchRequest.trim()) {
            return (
                <>
                    <span className={`${type} !leading-[1]`}>{visibleText}</span>
                    {text.length > maxLength && (
                        <span className={`${type} !leading-[1]`}>...</span>
                    )}
                </>
            );
        }

        // остальной код подсветки
        const lowerText = text.toLowerCase();
        const lowerSearch = searchRequest.toLowerCase();
        const result: JSX.Element[] = [];
        let lastIndex = 0;
        let i = 0;
        let hasHiddenMatches = false;

        while (i < visibleText.length) {
            if (lowerText.startsWith(lowerSearch, i)) {
                if (i > lastIndex) {
                    result.push(
                        <span key={`text-${i}`} className={`${type} !leading-[1]`}>
                        {visibleText.slice(lastIndex, i)}
                    </span>
                    );
                }
                result.push(
                    <span
                        key={`match-${i}`}
                        style={{ backgroundColor: "var(--color-hover)" }}
                        className={`${type} !leading-[1]`}
                    >
                    {visibleText.slice(i, i + lowerSearch.length)}
                </span>
                );
                i += lowerSearch.length;
                lastIndex = i;
            } else {
                i++;
            }
        }

        if (lastIndex < visibleText.length) {
            result.push(
                <span key="remaining" className={`${type} !leading-[1]`}>
                {visibleText.slice(lastIndex)}
            </span>
            );
        }

        if (hiddenText.toLowerCase().includes(lowerSearch)) {
            hasHiddenMatches = true;
        }

        if (text.length > maxLength) {
            result.push(
                <span
                    key="ellipsis"
                    style={hasHiddenMatches ? { backgroundColor: "var(--color-hover)" } : {}}
                    className={`${type} !leading-[1]`}
                >
                ...
            </span>
            );
        }

        return <>{result}</>;
    };

    // ФИЛЬТРУЕТ ТОЛЬКО ПО ПОИСКУ: У != Б

    const filteredTodos = useMemo(() => {
        return allTodos.filter((el) => {
            if (searchRequest.trim() === '') return false;
            if (type === 'usual') {
                return (
                    el.title.toLowerCase().includes(value.toLowerCase()) ||
                    el.description.toLowerCase().includes(value.toLowerCase())
                )
            } else {
                return (
                    el.tags.some(tag => tag.name.toLowerCase() === type.toLowerCase())
                )
            }
        });
    }, [allTodos, searchRequest, type, value]);

    // ФИЛЬТРУЕТ ПО СОВПАДЕНИЯМ

    const totalFilteredTodos: TotalFilteredTodo[] = useMemo(() => {
        const result = filteredTodos.map((el) => {
            const titleMatches = countMatches(el.title);
            const descMatches = countMatches(el.description);

            return {
                id: el.id,
                title: el.title,
                description: el.description,
                commonInTitle: titleMatches,
                commonInDescription: descMatches,
                highlightedTitle: highlightMatches(el.title, 'title', type === 'usual'),
                highlightedDescription: highlightMatches(el.description, 'desc', type === 'usual'),
            };
        }).sort((a, b) => {
            const totalA = a.commonInTitle + a.commonInDescription;
            const totalB = b.commonInTitle + b.commonInDescription;

            if (totalA !== totalB) {
                return totalB - totalA;
            }
            if (a.commonInTitle !== b.commonInTitle) {
                return b.commonInTitle - a.commonInTitle;
            }
            return 0;
        });

        return result;
    }, [countMatches, filteredTodos, highlightMatches, type]);

    function handleClick(id: number) {
        setIsSearchingNow(false)
        dispatch(setTodoAnimated(id))
        setTimeout(() => {
            dispatch(clearTodoAnimated(id))
        }, 2000)
    }

    return (
        <div className="flex justify-center outside">
            {filteredTodos.length === 0 ? (
                <div>
                    <span>Ничего не найдено</span>
                </div>
            ) : (
                <div className="flex flex-col gap-1 w-full">
                    {totalFilteredTodos.map((el, index) => (
                        <button onClick={() => handleClick(el.id)} key={index}
                                className="flex flex-col text-start p-2 rounded-lg miniInset">
                            <span className="!leading-[1]" title={el.title}>{el.highlightedTitle}</span>
                            <span className="!leading-[1]" title={el.description}>{el.highlightedDescription}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FoundTodos;