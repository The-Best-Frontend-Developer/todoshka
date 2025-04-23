import {Outlet} from "react-router-dom";
import Header from "./Header/Header.tsx";
import {useAppDispatch, useAppSelector} from "./store/myHook.ts";
import {addTodo} from "./store/Reducers/todoReducer.ts";
import MyModal from "./MyModal/MyModal.tsx";
import {useEffect} from "react";
import {SelectionSync} from "./SelectionSync.tsx";
import {deleteAllItems} from "./store/Reducers/translateItemsReducer.ts";

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
            status: 'waiting',
            selected: false}))

    }

    const clearStorage = () => {
        localStorage.clear()
    }

    useEffect(() => {
        window.addEventListener('click', () => {dispatch(deleteAllItems())})
    }, []);

    return (
        <>
            <Header/>
            <Outlet/>
            <button onClick={clearStorage} className="absolute hover:bg-hover top-7 bg-extra p-3 rounded-2xl">очистить хранилище</button>
            <button onClick={handleAddTodo} className="absolute hover:bg-hover top-20 bg-extra p-3 rounded-2xl">Добавить todo</button>
            <MyModal/>
            <SelectionSync/>
        </>
    );
};

export default App;