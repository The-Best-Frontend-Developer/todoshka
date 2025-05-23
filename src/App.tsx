import {Outlet, useLocation} from "react-router-dom";
import Header from "./Header/Header.tsx";
import {useAppDispatch, useAppSelector} from "./store/myHook.ts";
import MyModal from "./MyModal/MyModal.tsx";
import {useEffect} from "react";
import {SelectionSync} from "./SelectionSync.tsx";
import {deleteAllItems} from "./store/Reducers/translateItemsReducer.ts";
import {addRecentTag, deleteRecentTag, updateRecentTags} from "./store/Reducers/tagsReducer.ts";
import {Tag, TypeTodo} from "./TypeTodo.ts";
import {Helmet} from 'react-helmet';

const App = () => {
    const location = useLocation();
    const path = location.pathname;

    // Маппинг путей на данные для метаданных
    const metaMap: Record<string, { title: string; description: string; }> = {
        '/': {
            title: 'Список дел',
            description: 'Приятного планирования!',
        },
        '/about': {
            title: 'О сайте',
            description: 'Это всё сделал один человек',
        },
        '/statistics': {
            title: 'Статистика',
            description: 'А сколько созданных задач у вас?',
        },
        '/deleted-todos': {
            title: 'Корзина',
            description: 'Посмотрим, что в корзине...',
        },
    };

    const metaCard = {
        title: 'Тудушка',
        description: 'Создавайте задачи, чтобы следить за расписанием',
    }

    const meta = metaMap[path] || {
        title: 'Тудушка',
        description: '',
    };

    const modal = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch()
    const tags = useAppSelector(state => state.tags)
    const todos = useAppSelector(state => state.todo)

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
        if (tags.length > 15) {
            dispatch(updateRecentTags())
        }
    }, [dispatch, tags]);

    useEffect(() => {
        if (modal.openedModal !== null) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [modal.openedModal]);

    useEffect(() => {
        window.addEventListener('click', () => {
            dispatch(deleteAllItems())
        })
    }, [dispatch]);

    return (
        <>
            <Header/>
            <Helmet>
                <title>{meta.title} — Тудушка</title>
                <meta name="description" content={meta.description}/>
                <meta property="og:title" content={metaCard.title} />
                <meta property="og:description" content={metaCard.description} />
            </Helmet>
            <Outlet/>
            <MyModal/>
            <SelectionSync/>
        </>
    );
};

export default App;