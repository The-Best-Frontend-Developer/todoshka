import {useAppDispatch, useAppSelector} from "../store/myHook.ts";
import {openClearModal, openStatisticsModal} from "../store/Reducers/modalReducer.ts";

const StatisticsPage = () => {
    const dispatch = useAppDispatch()
    const statistics = useAppSelector(state => state.statistics)
    const renderStatistics = [
        {name: 'Количество созданных задач', info: statistics.createdTodos},
        {name: 'Количество завершенных задач', info: statistics.doneTodos},
        {name: 'Количество удаленных задач', info: statistics.deletedTodos},
    ]

    return (
        <div className="flex flex-col items-center p-10">
            <div className="grid grid-rows-3 grid-cols-1 lg:grid-rows-1 w-full lg:grid-cols-3 gap-5">
                {renderStatistics.map((el) => (
                    <div
                        className="w-full relative overflow-y-hidden flex items-center flex-col h-[40vh] lg:h-[50vh] border-10 border-solid border-hover rounded-3xl bg-hover">
                        <div className="flex bg-hover p-3 min-h-13 lg:min-h-20 rounded-t-2xl">
                            <h2 className="text-lg md:text-xl">
                                {el.name}
                            </h2>
                        </div>
                        <div className="absolute inset-0 top-13 lg:top-20 pointer-events-none inset"></div>
                        <div className="flex justify-center items-center rounded-b-2xl my-auto bg-extra w-full h-full">
                            <p className="text-9xl flex justify-center min-w-25 p-2 rounded-2xl shadowItem">{el.info}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col lg:flex-row mt-3 lg:mt-5 gap-1 sm:gap-5">
                <button className="p-3 bg-extra hover:bg-red-400 text-text rounded-xl w-100"
                        onClick={() => dispatch(openStatisticsModal())} bg-red-400 text-opposite rounded-xl>Сбросить
                    статистику
                </button>
                <button className="p-3 bg-extra hover:bg-red-400 text-text rounded-xl w-100"
                        onClick={() => dispatch(openClearModal())}>Сбросить данные
                </button>
            </div>
        </div>
    );
};

export default StatisticsPage;