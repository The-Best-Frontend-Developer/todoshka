import {useAppDispatch, useAppSelector} from "../store/myHook.ts";
import {openModal} from "../store/Reducers/modalReducer.ts";

const StatisticsPage = () => {
    const dispatch = useAppDispatch()
    const statistics = useAppSelector(state => state.statistics)
    const renderStatistics = [
        {id: 1, name: 'Количество созданных задач', info: statistics.createdTodos, src: './cat.mp4'},
        {id: 2, name: 'Количество завершенных задач', info: statistics.doneTodos, src: './cat.mp4'},
        {id: 3, name: 'Количество удаленных задач', info: statistics.deletedTodos, src: './cat.mp4'},
    ]

    return (
        <div className="flex flex-col items-center p-10">
            <div className="grid grid-rows-3 grid-cols-1 md:grid-rows-1 w-full md:grid-cols-3 gap-5">
                {renderStatistics.map((el) => (
                    <div key={el.id}
                         className="w-full relative overflow-y-hidden flex items-center flex-col h-[clamp(40vh,_300px,_500px)] border-10 border-solid border-hover rounded-3xl bg-hover">
                        <div className="flex bg-hover p-3 min-h-13 lg:min-h-20 rounded-t-2xl">
                            <h2 className="text-xs lg:text-xl xl:text-2xl 3xl:text-4xl">
                                {el.name}
                            </h2>
                        </div>
                        <div className="absolute inset-0 top-13 lg:top-20 pointer-events-none inset"></div>
                        <div className="flex justify-center items-center rounded-b-2xl my-auto bg-extra w-full h-full overflow-clip">
                            <p className={`flex text-8xl md:text-9xl justify-center min-w-25 p-2 rounded-2xl shadowItem`}>
                                {el.info}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col lg:flex-row mt-3 lg:mt-5 gap-1 sm:gap-5">
                <button className="p-3 bg-extra hover:bg-red-400 text-text rounded-xl w-[80vw] md:w-100"
                        onClick={() => dispatch(openModal({type: "statistics"}))}>Сбросить
                    статистику
                </button>
                <button className="p-3 bg-extra hover:bg-red-400 text-text rounded-xl w-[80vw] md:w-100"
                        onClick={() => dispatch(openModal({type: "clear"}))}>Сбросить данные
                </button>
            </div>
        </div>
    );
};

export default StatisticsPage;