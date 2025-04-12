import {Outlet} from "react-router-dom";
import Header from "./Header/Header.tsx";

const App = () => {
    const clearStorage = () => {
        localStorage.clear()
    }
    return (
        <>
            <Header/>
            <Outlet/>
            <button onClick={clearStorage} className="absolute hover:bg-hover top-7 bg-extra p-3 rounded-2xl">очистить хранилище</button>
        </>
    );
};

export default App;