import {Tag} from "../../TypeTodo.ts";
import React from "react";

type Props = {
    tag: Tag,
    setTags: React.Dispatch<React.SetStateAction<Tag[]>>
}

const Tags = ({tag, setTags}: Props) => {

    return (
        <div className="flex items-center bg-extra rounded-lg py-0.5 px-1 sm:px-1.5" key={tag.id}>
            <span className="text-xs sm:text-sm" title={tag.name.length > 13 ? tag.name : undefined}>{tag.name.length > 13 ? tag.name.slice(0, 13) + "..." : tag.name}</span>
            <button className="ml-1 p-0.5" type="button"
                    onClick={(e) => {
                        setTags(prev => prev.filter(el => el.id !== tag.id))
                        e.stopPropagation()
                    }}
            >
                <svg className="stroke-text" width="15" height="15" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
            </button>
        </div>
    );
};

export default Tags;