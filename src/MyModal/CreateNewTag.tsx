import {Tag} from "../TypeTodo.ts";
import React, {useRef, useState} from "react";

type Props = {
    tags: Tag[],
    setTags: React.Dispatch<React.SetStateAction<Tag[]>>
}

const CreateNewTag = ({tags, setTags}: Props) => {
    const [createTagNow, setCreateTagNow] = useState(false)
    const [newTag, setNewTag] = useState('')
    const tagInputRef = useRef<HTMLInputElement>(null!)

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
            setCreateTagNow(false)
            setNewTag('')
            tagInputRef.current.blur()
            if (newTag !== "") {
                setTags(prev => [...prev, {id: Math.random(), name: newTag}])
            }
        }
    }

    return (
        <div className="flex items-center bg-extra rounded-lg py-0.5 px-1 sm:px-1.5"
             onClick={tags.length < 5 ? () => {
                 setCreateTagNow(true);
                 tagInputRef?.current.focus()
             } : () => {return}}
        >
            {!createTagNow && <span className="text-xs sm:text-sm">{tags.length < 5 ? 'Добавить тег' : 'Максимум 5 тегов'}</span>}
            {tags.length < 5 && (
                <input ref={tagInputRef} value={newTag} onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setNewTag(e.target.value)}
                   className={`${createTagNow ? 'w-30' : 'm-0 ml-1 w-5'} h-[80%] bg-second rounded-md p-1`}
                   placeholder={createTagNow ? "тег" : "..."}
                   onBlur={() => {
                       setCreateTagNow(false);
                       setNewTag('')
                   }}
            />)}
            {createTagNow && (
                <button onMouseDown={newTag !== "" ? () => setTags(prev => [...prev, {
                    id: Math.random(),
                    name: newTag,
                    usages: 1
                }]) : () => {
                    return
                }}
                        className="ml-1 p-0.5"
                >
                    {newTag !== "" ? (
                        <svg className="stroke-text" width="15" height="15" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M9 12l2 2l4 -4"/>
                        </svg>
                    ) : (
                        <svg className="stroke-text" width="15" height="15" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                             strokeLinecap="round"
                             strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="15" y1="9" x2="9" y2="15"/>
                            <line x1="9" y1="9" x2="15" y2="15"/>
                        </svg>
                    )}
                </button>
            )}
        </div>
    );
};

export default CreateNewTag;