import {Status} from "../TypeTodo.ts";
import {useState} from "react";
import {addTodo} from "../store/todoReducer.ts";
import {useAppDispatch} from "../store/myHook.ts";
import {closeModal} from "../store/modalReducer.ts";

const CreateModal = ({status}: { status?: Status }) => {
    const dispatch = useAppDispatch()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedValue, setSelectedValue] = useState<Status>(status || 'waiting')

    return (
        <form className="flex flex-col gap-3">
            <h2 className="text-4xl">Создать задачу</h2>
            <input className="mt-10 placeholder:text-main border-1 border-extra rounded-lg p-2 focus:outline-none focus:border-main"
                   type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название"/>
            <input className="border-1 placeholder:text-main border-extra rounded-lg p-2 focus:outline-none focus:border-main" type="text"
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
            <button className="border-1 p-2 focus:outline-none rounded-xl w-1/2 mx-auto border-extra" type="submit"
                    onClick={(e) => {
                        dispatch(addTodo({id: Date.now(), title, description, status: selectedValue}));
                        dispatch(closeModal());
                        e.preventDefault()
                    }}
            >
                Создать
            </button>
        </form>
    );
};

export default CreateModal;