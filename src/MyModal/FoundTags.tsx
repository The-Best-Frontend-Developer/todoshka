import {useAppSelector} from "../store/myHook.ts";
import React from "react";
import {Tag} from "../TypeTodo.ts";

type Props = {
    searchRequest: string,
    setTags: React.Dispatch<React.SetStateAction<Tag[]>>
}

const FoundTags = ({searchRequest, setTags}: Props) => {
    const allTags = useAppSelector(state => state.tags);

    const matchedTags = allTags.filter(tag =>
        tag.name.toLowerCase().includes(searchRequest.toLowerCase())
    );

    if (matchedTags.length === 0) return null;

    return (
        <div className="absolute top-9 left-0 flex flex-col items-center gap-1 bg-extra border-solid border-text border-1 rounded-xl p-1 w-full max-h-30 overflow-y-auto scrollbar-none">
            {matchedTags.map((el) => (
                <button key={el.id} className="bg-second flex px-1 items-center rounded-lg w-full h-7 shrink-0" onMouseDown={() => setTags(prev => [...prev, {id: Math.random(), name: el.name}])}>
                    <span title={el.name.length > 11 ? el.name.slice(0, 15) : undefined} className="text-xs sm:text-sm leading-[100%] truncate">{el.name}</span>
                </button>
            ))}
        </div>
    );
};

export default FoundTags;