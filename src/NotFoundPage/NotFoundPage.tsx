import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center h-[100vh]">
            <div className="flex gap-2 items-center">
                <h2 className="text-[150px] leading-[1]">404</h2>
                <svg className="stroke-text h-[50%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="22" y1="22" x2="16.65" y2="16.65"/>
                    <path
                        d="M6 9.5 a4 4 0 0 1 4 -3.5"
                        stroke="currentColor"
                        strokeWidth="1"
                        opacity="0.3"
                        fill="none"
                    />
                </svg>
            </div>
            <h3 className="text-3xl">Этой страницы не существует</h3>
            <Link to="/" className="!underline text-2xl">На главную</Link>
        </div>
    );
};

export default NotFoundPage;