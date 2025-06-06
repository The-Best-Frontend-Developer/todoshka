import {Tag} from "../TypeTodo.ts";
import React, {useRef, useState} from "react";
import {useAppSelector} from "../store/myHook.ts";
import FoundTags from "./FoundTags.tsx";

type Props = {
    tags: Tag[],
    setTags: React.Dispatch<React.SetStateAction<Tag[]>>
}

const CreateNewTag = ({tags, setTags}: Props) => {
    const allTags = useAppSelector(state => state.tags)
    const [createTagNow, setCreateTagNow] = useState(false)
    const [newTag, setNewTag] = useState('')
    const tagInputRef = useRef<HTMLInputElement>(null!)
    const [createdTags, setCreatedTags] = useState(0)
    const [findAllTags, setFindAllTags] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null!)

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
            setCreateTagNow(false)
            setNewTag('')
            tagInputRef.current.blur()
            if (newTag.trim() !== "") {
                setTags(prev => [...prev, {id: Math.random(), name: newTag}])
                setCreatedTags(prev => prev + 1)
            }
        }
    }

    return (
        <button ref={buttonRef} className={`flex relative items-center bg-extra rounded-lg py-0.5 px-1 sm:px-1.5 ${tags.length < 5 ? 'cursor-pointer' : '!cursor-default'}`}
             onClick={(e) => {
                 buttonRef.current.focus()
                 e.preventDefault()
                 if (tags.length < 5) {
                     if (allTags.length + createdTags < 10) {
                         setCreateTagNow(true);
                         tagInputRef?.current.focus();
                     } else {
                         setFindAllTags(prev => !prev);
                     }
                 }
             }}
             onBlur={() => setFindAllTags(false)}
        >
            {!createTagNow && <span
                className="text-xs sm:text-sm p-1">{tags.length > 4 ? 'Максимум 5 тегов' : allTags.length + createdTags > 9 ? 'Макс. 10 уникальных тегов' : 'Добавить тег'}</span>}
            {tags.length < 5 && (
                <input ref={tagInputRef} value={newTag} onKeyDown={(e) => handleKeyDown(e)}
                       onChange={(e) => setNewTag(e.target.value)}
                       className={`${createTagNow ? 'w-30' : 'm-0 ml-1 w-5'} h-[80%] bg-second rounded-md p-1`}
                       placeholder={createTagNow ? "тег" : "..."}
                       onBlur={() => {
                           setCreateTagNow(false);
                           setNewTag('')
                       }}
                />)}
            {createTagNow && (
                <button
                    onMouseDown={() => {
                        setCreateTagNow(false);
                        setNewTag('')
                        if (newTag.trim() !== "") {
                            setTags(prev => [
                                ...prev,
                                {
                                    id: Math.random(),
                                    name: newTag,
                                    usages: 1
                                }
                            ]);
                            setCreatedTags(prev => prev + 1)
                        }
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
            {(newTag.trim() !== "" || findAllTags) && <FoundTags searchRequest={newTag} setTags={setTags} showAllTags={findAllTags}/>}
        </button>
    );
};

export default CreateNewTag;