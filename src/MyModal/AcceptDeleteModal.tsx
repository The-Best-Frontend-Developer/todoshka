import {useAppDispatch} from "../store/myHook.ts";
import {deleteStatistics} from "../store/Reducers/statisticsReducer.ts";
import {useNavigate} from "react-router-dom";

const AcceptDeleteModal = (accept: {accept: string}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    function handleClick() {
        if (accept.accept === "statistics") {
            dispatch(deleteStatistics())
        } else {
            localStorage.clear()
        }
        navigate(0)
    }

    return (
        <div className="flex flex-col">
            <h2 className="text-lg sm:text-2xl">
                Подтверждение удаления {accept.accept === "statistics" ? "статистики" : "данных"}
            </h2>
            <p>
                Кнопка ниже удаляет {accept.accept === "statistics" ? "всю статистику" : "все данные"}.
                <br/>Будет удалено безвозвратно: <span className="!text-red-600">{accept.accept === "statistics" ? "статистика." : "все задачи, все задачи из корзины, данные о сохраненной цветовой теме."}</span>
                <br/>Страница перезагрузится.
                <br/>Вы уверены?
            </p>
            <button onClick={handleClick} className="bg-extra hover:bg-red-400 mt-5 text-opposite text-lg p-2 rounded-xl sm:text-2xl">Подтвердить</button>
        </div>
    );
};

export default AcceptDeleteModal;