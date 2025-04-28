import {useAppDispatch} from "../store/myHook.ts";
import {deleteStatistics} from "../store/Reducers/statisticsReducer.ts";

const AcceptDeleteModal = (accept: {accept: string}) => {
    const dispatch = useAppDispatch()

    function handleClick() {
        if (accept.accept === "statistics") {
            dispatch(deleteStatistics())
        } else {
            localStorage.clear()
        }
    }

    return (
        <div className="flex flex-col">
            <h2 className="text-lg sm:text-2xl">
                Подтверждение удаления {accept.accept === "statistics" ? "статистики" : "данных"}
            </h2>
            <p>
                Кнопка ниже удаляет {accept.accept === "statistics" ? "всю статистику" : "все данные"}. Вы уверены?
            </p>
            <button onClick={handleClick} className="bg-extra hover:bg-red-400 mt-5 text-opposite text-lg p-2 rounded-xl sm:text-2xl">Подтвердить</button>
        </div>
    );
};

export default AcceptDeleteModal;