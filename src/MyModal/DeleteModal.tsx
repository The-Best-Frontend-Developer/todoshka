import {totalDeleteTodo} from "../store/Reducers/deletedTodosReducer.ts";
import {useAppDispatch} from "../store/myHook.ts";
import {closeModal} from "../store/Reducers/modalReducer.ts";

const DeleteModal = ({id}: {id: number}) => {
    const dispatch = useAppDispatch()

    return (
        <div className="flex flex-col gap-1">
            <h3 className="text-lg sm:text-xl">Подтверждение удаления задачи</h3>
            <span className="text-sm sm:text-base">Задача будет удалена <span className="!text-red-700">без возможности восстановления</span></span>
            <button
                className="dangerousButton p-1 w-[90%] self-center"
                onClick={() => {
                    dispatch(totalDeleteTodo(id))
                    dispatch(closeModal())
                }}
            >
                Подтвердить удаление
            </button>
        </div>
    );
};

export default DeleteModal;