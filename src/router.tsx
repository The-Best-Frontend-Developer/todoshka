import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./HomePage/HomePage";
import StatisticsPage from "./StatisticsPage/StatisticsPage";
import About from "./AboutPage/About.tsx";
import DeletedTodosPage from "./DeletedTodosPage/DeletedTodosPage.tsx";
import NotFoundPage from "./NotFoundPage/NotFoundPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "statistics", element: <StatisticsPage /> },
            { path: "about", element: <About/>},
            { path: "deleted-todos", element: <DeletedTodosPage/>},
        ],
    },
    { path: "*", element: <NotFoundPage/>}
]);

export default router;