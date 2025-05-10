import {Link, useLocation} from "react-router-dom";
import Settings from "./Settings/Settings.tsx";
import Search from "./Search/Search.tsx";

const Header = () => {
    const page = useLocation()

    return (
        <header
            className="
                bg-main px-5 sm:px-10 md:px-15
                flex justify-between items-center h-15 relative gap-5 sm:gap-10 shadow-lg shadow-light-hover"
        >
            <Link to='/' className='w-10 sm:w-15 bg-gray-300 rounded-2xl p-1'>
                <img src='./image.png' alt='логотип'/>
            </Link>
            <Link to="/" className="hidden sm:block lg:absolute lg:left-[calc(50%_-_100px)] lg:top-3"><h2
                className="text-xl md:text-4xl text-text noneSelect">Список дел</h2></Link>
            <div className="flex gap-2">
                {page.pathname === "/" && <Search/>}
                <Settings/>
            </div>
        </header>
    );
};

export default Header;