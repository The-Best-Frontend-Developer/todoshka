import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./HomePage/HomePage";
import StatisticsPage from "./StatisticsPage/StatisticsPage";
import About from "./About/About.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "statistics", element: <StatisticsPage /> },
            { path: "about", element: <About/>}
        ],
    },
]);

export default router;