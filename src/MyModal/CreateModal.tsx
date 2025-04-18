import {Status} from "../TypeTodo.ts";
import {useEffect, useRef, useState} from "react";
import {addTodo} from "../store/todoReducer.ts";
import {useAppDispatch} from "../store/myHook.ts";
import {closeModal} from "../store/modalReducer.ts";

const CreateModal = ({status}: { status?: Status }) => {
    const dispatch = useAppDispatch()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedValue, setSelectedValue] = useState<Status>(status || 'waiting')
    const [errors, setErrors] = useState<string | null>(null)
    const [isTouched, setIsTouched] = useState(false)

    const textareaRef = useRef<HTMLTextAreaElement>(null!)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px' // авторазмер
        }
    }, [description])

    useEffect(() => {
        if (isTouched) {
            setErrors(null)
            if ('' === title.trim()) {
                setErrors('Название обязательно')
            }
        }
    }, [title]);

    function validation() {
        if ('' === title.trim()) {
            setErrors('Название обязательно')
        } else {
            setErrors(null)
        }
    }

    return (
        <form className="flex flex-col gap-3">
            <h2 className="text-4xl">Создать задачу</h2>
            <button type="button" className="absolute right-1 top-1 stroke-red-500 hover:stroke-red-400"
                    onClick={() => dispatch(closeModal())}
            >
                <svg width="35" height="35" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="4"
                        y="4"
                        width="40"
                        height="40"
                        rx="10"
                        stroke-width="1"
                        fill="none"
                    />
                    <line x1="16" y1="16" x2="32" y2="32" stroke-width="1"/>
                    <line x1="32" y1="16" x2="16" y2="32" stroke-width="1"/>
                </svg>
            </button>
            <input spellCheck={false} required
                   className="mt-10 relative placeholder:text-main border-1 border-extra rounded-lg p-2 focus:outline-none"
                   type="text" value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   onBlur={validation}
                   onFocus={() => {setIsTouched(true); setErrors('')}}
                   placeholder="Название"
            />
            <h4 className="text-xs !text-red-500 !-my-2 ml-2">{errors}</h4>
            <textarea spellCheck={false}
                      ref={textareaRef}
                      className="border-1 placeholder:text-main min-h-13 max-h-60 border-extra rounded-lg p-2 focus:outline-none focus:border-main scrollbar-custom"
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
            <button className="border-1 p-2 focus:outline-none rounded-xl w-3/4 hover:bg-hover mx-auto border-extra" type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        if (!errors && isTouched) {
                            dispatch(addTodo({id: Date.now(), title, description, status: selectedValue}));
                            dispatch(closeModal());
                        } else { validation() }
                    }}
            >
                Создать
            </button>
        </form>
    );
};

export default CreateModal;