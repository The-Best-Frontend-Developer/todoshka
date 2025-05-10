import {Outlet} from "react-router-dom";
import Header from "./Header/Header.tsx";
import {useAppDispatch, useAppSelector} from "./store/myHook.ts";
import {addTodo} from "./store/Reducers/todoReducer.ts";
import MyModal from "./MyModal/MyModal.tsx";
import {useEffect} from "react";
import {SelectionSync} from "./SelectionSync.tsx";
import {deleteAllItems} from "./store/Reducers/translateItemsReducer.ts";
import {addCreatedTodos} from "./store/Reducers/statisticsReducer.ts";
import {addRecentTag, deleteRecentTag, updateRecentTags} from "./store/Reducers/tagsReducer.ts";
import {Tag, TypeTodo} from "./TypeTodo.ts";

const App = () => {
    const modal = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch()
    const tags = useAppSelector(state => state.tags)
    const todos = useAppSelector(state => state.todo)

    const handleAddTodo = () => {
        dispatch(addTodo({
            id: Math.random(),
            title: 'Название',
            description: 'Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание ' +
                'Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание ' +
                'Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание ' +
                'Описание Описание Описание Описание Описание Описание Описание ',
            status: 'waiting',
            tags: [
                {id: Math.random()*0.3, name: 'Тег'},
                {id: Math.random()*0.3, name: 'Тег'},
                {id: Math.random()*0.3, name: 'Тег'},
                {id: Math.random()*0.3, name: 'Тег'},
            ]
        }))
        dispatch(addCreatedTodos())
    }

    const clearStorage = () => {
        localStorage.clear()
    }

    useEffect(() => {
        const allTodos: TypeTodo[] = [...todos.waiting, ...todos.progress, ...todos.done]

        const uniqueTagsMap = new Map<string, Tag>();
        for (const todo of allTodos) {
            for (const tag of todo.tags) {
                if (!uniqueTagsMap.has(tag.name)) {
                    uniqueTagsMap.set(tag.name, tag);
                }
            }
        }

        const uniqueTags: Tag[] = Array.from(uniqueTagsMap.values())

        // Добавляем новые теги
        uniqueTags.forEach(tag => {
            if (!tags.some(t => t.name === tag.name)) {
                dispatch(addRecentTag(tag))
            }
        })

        // Удаляем отсутствующие теги
        tags.forEach(tag => {
            if (!uniqueTags.some(t => t.name === tag.name)) {
                dispatch(deleteRecentTag(tag.name))
            }
        })

    }, [dispatch, tags, todos])

    useEffect(() => {
        if (tags.length > 15) {dispatch(updateRecentTags())}
    }, [tags]);

    useEffect(() => {
        if (modal.openedModal !== null) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [modal.openedModal]);

    useEffect(() => {
        window.addEventListener('click', () => {dispatch(deleteAllItems())})
    }, []);

    return (
        <>
            <Header/>
            <Outlet/>
            <MyModal/>
            <SelectionSync/>
        </>
    );
};

export default App;