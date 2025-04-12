import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./HomePage/HomePage";
import StatisticsPage from "./StatisticsPage/StatisticsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "about", element: <StatisticsPage /> }
        ],
    },
]);

export default router;