import {Outlet} from "react-router-dom";
import Header from "./Header/Header.tsx";
import {useAppDispatch} from "./store/myHook.ts";
import {addTodo} from "./store/todoReducer.ts";
import MyModal from "./MyModal/MyModal.tsx";

const App = () => {
    const dispatch = useAppDispatch()

    const handleAddTodo = () => {
        dispatch(addTodo({
            id: Math.random(),
            title: 'Название',
            description: 'Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание ' +
                'Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание ' +
                'Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание ' +
                'Описание Описание Описание Описание Описание Описание Описание ',
            status: 'waiting'}))

    }

    const clearStorage = () => {
        localStorage.clear()
    }
    return (
        <>
            <Header/>
            <Outlet/>
            <button onClick={clearStorage} className="absolute hover:bg-hover top-7 bg-extra p-3 rounded-2xl">очистить хранилище</button>
            <button onClick={handleAddTodo} className="absolute hover:bg-hover top-20 bg-extra p-3 rounded-2xl">Добавить todo</button>
            <MyModal/>
        </>
    );
};

export default App;