import {useAppDispatch, useAppSelector} from "../store/myHook.ts";
import {Status} from '../TypeTodo.ts'
import {deleteTodo} from "../store/todoReducer.ts";
import {openCreateModal} from "../store/modalReducer.ts";

const Todos = ({status}: { status: Status }) => {
    const dispatch = useAppDispatch()
    const todos = useAppSelector(state => state.todo)
    return (
        todos[status].length === 0 ? (
                <div className="flex flex-col mt-10 justify-center gap-3 items-center rounded-3xl p-3 bg-hover select-none shadowItem"><h2>Пока пусто...</h2>
                    <button className="p-2 bg-main hover:bg-light-hover rounded-2xl shadowItem"
                        onClick={() => dispatch(openCreateModal(status))}
                    >Создайте первую задачу
                    </button>
                </div>) :
            todos[status].map((el) => (
                <div key={el.id} className="flex flex-col relative shrink-0 px-5 py-2 min-h-20 bg-second rounded-2xl shadowItem">
                    <button className="absolute right-2 top-2 fill-hover hover:fill-text"
                        onClick={() => dispatch(deleteTodo({id: el.id, status}))}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15"
                             viewBox="0 0 50 50">
                            <path
                                d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                        </svg>
                    </button>
                    <h3 className="text-xl select-none">{el.title}</h3>
                    <p className="text-sm select-none leading-[90%]">{el.description}</p>
                </div>
            ))
    );
};

export default Todos;