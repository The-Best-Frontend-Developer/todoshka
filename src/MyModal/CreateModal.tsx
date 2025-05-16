import {Status, Tag} from "../TypeTodo.ts";
import React, {useEffect, useRef, useState} from "react";
import {addTodo} from "../store/Reducers/todoReducer.ts";
import {useAppDispatch, useAppSelector} from "../store/myHook.ts";
import {closeModal} from "../store/Reducers/modalReducer.ts";
import {addCreatedTodos} from "../store/Reducers/statisticsReducer.ts";
import CreateNewTag from "./CreateNewTag.tsx";

const CreateModal = ({status, errors, setErrors}: {
    status?: Status,
    errors: string | null,
    setErrors: React.Dispatch<React.SetStateAction<string | null>>
}) => {
    const dispatch = useAppDispatch()
    const modalState = useAppSelector(state => state.modal)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedValue, setSelectedValue] = useState<Status>(status || 'waiting')
    const [isTouched, setIsTouched] = useState(false)
    const [tags, setTags] = useState<Tag[]>([])

    const formRef = useRef<HTMLFormElement | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null!)
    const inputRef = useRef<HTMLInputElement>(null!)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
        }
    }, [description])

    useEffect(() => {
        if (modalState.openedModal === "create" && inputRef.current) {
            inputRef.current.focus();
        }
    }, [modalState]);

    useEffect(() => {
        if (isTouched) {
            setErrors(null)
            if ('' === title.trim()) {
                setErrors('Название обязательно')
            }
        }
    }, [isTouched, setErrors, title]);

    function validation() {
        if ('' === title.trim()) {
            setErrors('Название обязательно')
        } else {
            setErrors(null)
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();

            const trimmed = title.trim();
            const isValid = trimmed !== '';

            setErrors(isValid ? null : 'Название обязательно');

            if (isValid) {
                dispatch(addTodo({id: Date.now(), title, description, status: selectedValue, tags}));
                dispatch(addCreatedTodos());
                dispatch(closeModal());
            }
        }
    }

    return (
        <form className="flex flex-col gap-3" ref={formRef} noValidate>
            <h2 className="text-xl sm:text-2xl md:text-4xl">Создать задачу</h2>
            <button type="button" className="absolute right-1 top-1 stroke-red-500 hover:stroke-red-400"
                    onClick={() => {
                        dispatch(closeModal());
                        setErrors(null)
                    }}
            >
                <svg width="35" height="35" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="4"
                        y="4"
                        width="40"
                        height="40"
                        rx="10"
                        strokeWidth="1"
                        fill="none"
                    />
                    <line x1="16" y1="16" x2="32" y2="32" strokeWidth="1"/>
                    <line x1="32" y1="16" x2="16" y2="32" strokeWidth="1"/>
                </svg>
            </button>
            <input spellCheck={false} required
                   ref={inputRef}
                   onKeyDown={(e) => handleKeyDown(e)}
                   className="mt-3 sm:mt-5 relative input"
                   type="text" value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   onBlur={validation}
                   onFocus={() => {
                       setIsTouched(true);
                       setErrors('')
                   }}
                   placeholder="Название"
            />
            <h4 className="text-xs !text-red-500 !-my-2 ml-2">{errors}</h4>
            <textarea spellCheck={false}
                      ref={textareaRef}
                      className="min-h-13 max-h-40 input scrollbar-custom"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Описание"
            />
            <select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value as Status)}
                className="
                    bg-second text-text border border-extra rounded-lg
                    p-2
                    focus:outline-none focus:ring-2 focus:ring-second
                    transition-all duration-200"
            >
                <option className="hover:bg-second" value="waiting">Запланировано</option>
                <option value="progress">В процессе</option>
                <option value="done">Выполнено</option>
            </select>
            <div className="flex gap-1 md:gap-2 flex-wrap rounded-lg">
                {tags.map((el) => (
                    <div key={el.id} className="flex items-center bg-extra rounded-lg py-0.5 px-1 sm:px-1.5">
                        <span className="text-xs sm:text-sm"
                              title={el.name.length > 13 ? el.name : undefined}>{el.name.length > 13 ? el.name.slice(0, 13) + "..." : el.name}</span>
                        <button className="ml-1 p-0.5"
                                onClick={() => {
                                    setTags(prev => prev.filter((tag) => tag.id !== el.id))
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
                ))}
                <CreateNewTag tags={tags} setTags={setTags}/>
            </div>
            <button className="border-1 p-2 focus:outline-none rounded-xl w-3/4 hover:bg-hover mx-auto border-extra"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        if (!errors && isTouched) {
                            dispatch(addTodo({id: Date.now(), title, description, status: selectedValue, tags}));
                            dispatch(addCreatedTodos())
                            dispatch(closeModal());
                        } else {
                            validation()
                        }
                    }}
            >
                Создать
            </button>
        </form>
    );
};

export default CreateModal;