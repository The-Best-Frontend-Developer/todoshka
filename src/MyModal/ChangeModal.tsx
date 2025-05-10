import {Status, Tag} from "../TypeTodo.ts";
import {deleteTodo, updateTodo} from "../store/Reducers/todoReducer.ts";
import {closeModal} from "../store/Reducers/modalReducer.ts";
import {useAppDispatch, useAppSelector} from "../store/myHook.ts";
import React, {useEffect, useRef, useState} from "react";
import {addDeletedTodos} from "../store/Reducers/statisticsReducer.ts";
import Tags from "../Header/Search/Tags.tsx";
import CreateNewTag from "./CreateNewTag.tsx";

const ChangeModal = ({errors, setErrors}: {
    errors: string | null,
    setErrors: React.Dispatch<React.SetStateAction<string | null>>
}) => {
    const currentTodo = useAppSelector(state => state.modal.currentTodo)
    const dispatch = useAppDispatch()

    const [title, setTitle] = useState(currentTodo.title)
    const [description, setDescription] = useState(currentTodo.description)
    const [selectedValue, setSelectedValue] = useState<Status>(currentTodo.status)
    const [tags, setTags] = useState<Tag[]>(currentTodo.tags)

    const textareaRef = useRef<HTMLTextAreaElement>(null!)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
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
            <h2 className="text-xl sm:text-2xl md:text-4xl">Изменить задачу</h2>
            <input spellCheck={false} required
                   className="mt-3 sm:mt-5 relative input"
                   type="text" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={validation}
                   placeholder="Название"
            />
            <h4 className="text-xs !text-red-500 !-my-2 ml-2">{errors}</h4>
            <textarea spellCheck={false}
                      ref={textareaRef}
                      className="min-h-13 max-h-40 input scrollbar-custom"
                      value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание"/>
            <select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value as Status)}
                className="
                    !bg-second text-text focus:ring-2 focus:ring-second
                    transition-all duration-200 input"
            >
                <option className="hover:bg-second" value="waiting">Запланировано</option>
                <option value="progress">В процессе</option>
                <option value="done">Выполнено</option>
            </select>
            <div className="flex gap-1 sm:gap-2 flex-wrap">
                {tags.map((el) => (
                    <Tags tag={el} setTags={setTags}/>
                ))}
                <CreateNewTag tags={tags} setTags={setTags}/>
            </div>
            <button
                className="border-1 p-2 bg-extra focus:outline-none rounded-xl w-full md:w-3/4 mx-auto border-text hover:bg-hover"
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    if (!errors) {
                        dispatch(updateTodo({
                            newTodo: {id: currentTodo.id, title, description, status: selectedValue, tags},
                            oldStatus: currentTodo.status
                        }));
                        dispatch(closeModal());
                    }
                }}
            >
                Подтвердить изменения
            </button>
            <button
                className="border-1 p-2 bg-extra !text-red-700 hover:bg-red-500 hover:!text-white focus:outline-none rounded-xl w-full md:w-3/4 mx-auto border-red-500"
                type="button"
                onClick={() => {
                    dispatch(deleteTodo({id: currentTodo.id, status: currentTodo.status}));
                    dispatch(addDeletedTodos());
                    dispatch(closeModal())
                }}
            >
                Удалить
            </button>
        </form>
    );
};

export default ChangeModal;