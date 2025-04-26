import {Status} from "../TypeTodo.ts";
import {deleteTodo, updateTodo} from "../store/Reducers/todoReducer.ts";
import {closeModal} from "../store/Reducers/modalReducer.ts";
import {useAppDispatch, useAppSelector} from "../store/myHook.ts";
import React, {useEffect, useRef, useState} from "react";

const ChangeModal = ({errors, setErrors}: {errors: string | null, setErrors: React.Dispatch<React.SetStateAction<string | null>> }) => {
    const currentTodo = useAppSelector(state => state.modal.currentTodo)
    const dispatch = useAppDispatch()

    const [title, setTitle] = useState(currentTodo.title)
    const [description, setDescription] = useState(currentTodo.description)
    const [selectedValue, setSelectedValue] = useState<Status>(currentTodo.status)

    const textareaRef = useRef<HTMLTextAreaElement>(null!)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto' // сброс
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px' // авторазмер
        }
    }, [description])

    const validation = () => {
        if ('' === title.trim()) {
            setErrors('Название обязательно')
        } else {
            setErrors(null)
        }
    }

    return (
        <form className="flex flex-col gap-3">
            <h2 className="text-4xl">Изменить задачу</h2>
            <button type="button" className="absolute right-1 top-1 stroke-red-500 hover:stroke-red-400"
                onClick={() => {dispatch(closeModal()); setErrors(null)}}
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
                   className="mt-10 relative placeholder:text-main border-1 border-extra rounded-lg p-2 focus:outline-none"
                   type="text" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={validation}
                   placeholder="Название"
            />
            <h4 className="text-xs !text-red-500 !-my-2 ml-2">{errors}</h4>
            <textarea spellCheck={false}
                      ref={textareaRef}
                      className="border-1 placeholder:text-main min-h-13 max-h-60 border-extra rounded-lg p-2 focus:outline-none focus:border-main scrollbar-custom"
                      value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание"/>
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
            <button
                className="border-1 p-2 bg-extra focus:outline-none rounded-xl w-3/4 mx-auto border-text hover:bg-hover"
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    if (!errors) {
                        dispatch(updateTodo({
                            newTodo: {id: currentTodo.id, title, description, status: selectedValue},
                            oldStatus: currentTodo.status
                        }));
                        dispatch(closeModal());
                    }
                }}
            >
                Подтвердить изменения
            </button>
            <button
                className="border-1 p-2 bg-extra !text-red-700 hover:bg-red-500 hover:!text-white focus:outline-none rounded-xl w-3/4 mx-auto border-red-500"
                type="button"
                onClick={() => {
                    dispatch(deleteTodo({id: currentTodo.id, status: currentTodo.status}));
                    dispatch(closeModal())
                }}
            >
                Удалить
            </button>
        </form>
    );
};

export default ChangeModal;