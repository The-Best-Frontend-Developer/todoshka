import Themes from "./Themes.tsx";
import {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "../../store/myHook.ts";
import {changeRotate} from "../../store/Reducers/rotateReducer.ts";
import {Link, useLocation} from "react-router-dom";

const Settings = () => {
    const dispatch = useAppDispatch()
    const [isShowThemes, setIsShowThemes] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [showRotate, setShowRotate] = useState(false)
    const settingsRef = useRef<HTMLDivElement>(null!);
    const settings2Ref = useRef<HTMLDivElement>(null!);
    const page = useLocation()

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('Link')) {
                return;
            }
            if (settingsRef.current && !(settingsRef.current.contains(target) || settings2Ref.current.contains(target))) {
                setShowSettings(false);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className={`hidden lg:block
            lg:absolute top-0 right-0 z-30
            ${showSettings ? "lg:translate-x-0" : "lg:translate-x-65"} !duration-400 ease-in-out`}
                 ref={settings2Ref}
            >
                <Themes show={isShowThemes} setShowThemes={setIsShowThemes} setShowSettings={setShowSettings}/>
                <div className={`absolute w-65 py-3.5 bg-main top-15 -right-1
                 border-text border-2 border-solid rounded-l-2xl shadow-xl`}
                     onMouseEnter={() => setShowSettings(true)} onMouseLeave={() => setShowSettings(false)}
                >
                    <div className="
                    flex justify-center
                    w-12 h-11
                    absolute top-14.5 -left-12.5
                    rounded-l-2xl
                    bg-main pr-3"
                    >
                        <button
                            onClick={() => {
                                setShowSettings(prev => !prev);
                            }}
                        >
                            <svg className='fill-text' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                 width="31" height="31" viewBox="0 0 50 50">
                                <path
                                    d="M 22.205078 2 A 1.0001 1.0001 0 0 0 21.21875 2.8378906 L 20.246094 8.7929688 C 19.076509 9.1331971 17.961243 9.5922728 16.910156 10.164062 L 11.996094 6.6542969 A 1.0001 1.0001 0 0 0 10.708984 6.7597656 L 6.8183594 10.646484 A 1.0001 1.0001 0 0 0 6.7070312 11.927734 L 10.164062 16.873047 C 9.583454 17.930271 9.1142098 19.051824 8.765625 20.232422 L 2.8359375 21.21875 A 1.0001 1.0001 0 0 0 2.0019531 22.205078 L 2.0019531 27.705078 A 1.0001 1.0001 0 0 0 2.8261719 28.691406 L 8.7597656 29.742188 C 9.1064607 30.920739 9.5727226 32.043065 10.154297 33.101562 L 6.6542969 37.998047 A 1.0001 1.0001 0 0 0 6.7597656 39.285156 L 10.648438 43.175781 A 1.0001 1.0001 0 0 0 11.927734 43.289062 L 16.882812 39.820312 C 17.936999 40.39548 19.054994 40.857928 20.228516 41.201172 L 21.21875 47.164062 A 1.0001 1.0001 0 0 0 22.205078 48 L 27.705078 48 A 1.0001 1.0001 0 0 0 28.691406 47.173828 L 29.751953 41.1875 C 30.920633 40.838997 32.033372 40.369697 33.082031 39.791016 L 38.070312 43.291016 A 1.0001 1.0001 0 0 0 39.351562 43.179688 L 43.240234 39.287109 A 1.0001 1.0001 0 0 0 43.34375 37.996094 L 39.787109 33.058594 C 40.355783 32.014958 40.813915 30.908875 41.154297 29.748047 L 47.171875 28.693359 A 1.0001 1.0001 0 0 0 47.998047 27.707031 L 47.998047 22.207031 A 1.0001 1.0001 0 0 0 47.160156 21.220703 L 41.152344 20.238281 C 40.80968 19.078827 40.350281 17.974723 39.78125 16.931641 L 43.289062 11.933594 A 1.0001 1.0001 0 0 0 43.177734 10.652344 L 39.287109 6.7636719 A 1.0001 1.0001 0 0 0 37.996094 6.6601562 L 33.072266 10.201172 C 32.023186 9.6248101 30.909713 9.1579916 29.738281 8.8125 L 28.691406 2.828125 A 1.0001 1.0001 0 0 0 27.705078 2 L 22.205078 2 z M 23.056641 4 L 26.865234 4 L 27.861328 9.6855469 A 1.0001 1.0001 0 0 0 28.603516 10.484375 C 30.066026 10.848832 31.439607 11.426549 32.693359 12.185547 A 1.0001 1.0001 0 0 0 33.794922 12.142578 L 38.474609 8.7792969 L 41.167969 11.472656 L 37.835938 16.220703 A 1.0001 1.0001 0 0 0 37.796875 17.310547 C 38.548366 18.561471 39.118333 19.926379 39.482422 21.380859 A 1.0001 1.0001 0 0 0 40.291016 22.125 L 45.998047 23.058594 L 45.998047 26.867188 L 40.279297 27.871094 A 1.0001 1.0001 0 0 0 39.482422 28.617188 C 39.122545 30.069817 38.552234 31.434687 37.800781 32.685547 A 1.0001 1.0001 0 0 0 37.845703 33.785156 L 41.224609 38.474609 L 38.53125 41.169922 L 33.791016 37.84375 A 1.0001 1.0001 0 0 0 32.697266 37.808594 C 31.44975 38.567585 30.074755 39.148028 28.617188 39.517578 A 1.0001 1.0001 0 0 0 27.876953 40.3125 L 26.867188 46 L 23.052734 46 L 22.111328 40.337891 A 1.0001 1.0001 0 0 0 21.365234 39.53125 C 19.90185 39.170557 18.522094 38.59371 17.259766 37.835938 A 1.0001 1.0001 0 0 0 16.171875 37.875 L 11.46875 41.169922 L 8.7734375 38.470703 L 12.097656 33.824219 A 1.0001 1.0001 0 0 0 12.138672 32.724609 C 11.372652 31.458855 10.793319 30.079213 10.427734 28.609375 A 1.0001 1.0001 0 0 0 9.6328125 27.867188 L 4.0019531 26.867188 L 4.0019531 23.052734 L 9.6289062 22.117188 A 1.0001 1.0001 0 0 0 10.435547 21.373047 C 10.804273 19.898143 11.383325 18.518729 12.146484 17.255859 A 1.0001 1.0001 0 0 0 12.111328 16.164062 L 8.8261719 11.46875 L 11.523438 8.7734375 L 16.185547 12.105469 A 1.0001 1.0001 0 0 0 17.28125 12.148438 C 18.536908 11.394293 19.919867 10.822081 21.384766 10.462891 A 1.0001 1.0001 0 0 0 22.132812 9.6523438 L 23.056641 4 z M 25 17 C 20.593567 17 17 20.593567 17 25 C 17 29.406433 20.593567 33 25 33 C 29.406433 33 33 29.406433 33 25 C 33 20.593567 29.406433 17 25 17 z M 25 19 C 28.325553 19 31 21.674447 31 25 C 31 28.325553 28.325553 31 25 31 C 21.674447 31 19 28.325553 19 25 C 19 21.674447 21.674447 19 25 19 z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className='flex flex-col'>
                        <button onMouseEnter={() => setIsShowThemes(true)}
                                onMouseLeave={() => setIsShowThemes(false)}
                                className={`flex justify-center
                                py-2 border-l-2 -ml-0.5 hover:bg-light-hover relative !text-lg
                                ${isShowThemes ? 'bg-light-hover' : 'bg-main'}`
                                }
                        >
                            <span>Цветовые темы</span>
                        </button>
                        <Link to="/"
                              className="flex justify-center items-center gap-1 bg-main py-1 sm:py-2 !text-lg hover:bg-light-hover">
                            <div className="stroke-text -ml-5 fill-transparent">
                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <polygon strokeWidth="2" points="12,3 2,12 5,12 5,20 10,20 10,14 14,14 14,20 19,20 19,12 22,12"/>
                                </svg>
                            </div>
                            <span>Главная</span>
                        </Link>
                        <Link to="/statistics"
                              className="flex justify-center items-center gap-1 bg-main py-1 sm:py-2 !text-lg hover:bg-light-hover"
                        >
                            <div className="stroke-text -ml-5 fill-transparent">
                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="2,20 8,10 14,14 20,6" strokeWidth="2" fill="none" />
                                    <polyline points="18,6 20,6 20,8" strokeWidth="2" fill="none" />
                                </svg>
                            </div>
                            <span>Статистика</span>
                        </Link>
                        <Link to="/about"
                              className="flex justify-center items-center gap-1 bg-main py-1 sm:py-2 !text-lg hover:bg-light-hover"
                        >
                            <div className="stroke-text -ml-5 fill-transparent">
                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                                    <circle cx="12" cy="7" r="1" />
                                    <line x1="12" y1="11" x2="12" y2="17" strokeWidth="2" />
                                </svg>
                            </div>
                            <span>О сайте</span>
                        </Link>
                        <Link to="/deleted-todos"
                              className="flex justify-center items-center gap-1 bg-main py-1 sm:py-2 !text-lg hover:bg-light-hover"
                        >
                            <div className="stroke-transparent -ml-5 fill-text stroke-[1px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 774.266 774.266">
                                    <g>
                                        <g>
                                            <path d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875
			C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916
			c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703
			c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z
			 M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282
			c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802
			H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z"/>
                                            <rect x="475.031" y="286.593" width="48.418" height="396.942"/>
                                            <rect x="363.361" y="286.593" width="48.418" height="396.942"/>
                                            <rect x="251.69" y="286.593" width="48.418" height="396.942"/>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <span>Корзина</span>
                        </Link>
                        { page.pathname === "/" &&
                        <div
                            className={`flex-col justify-between bg-main sm:hidden lg:flex ${showRotate ? 'h-17' : 'h-11'} pt-2 hover:bg-light-hover overflow-hidden`}
                            onMouseEnter={() => setShowRotate(true)} onMouseLeave={() => setShowRotate(false)}
                        >
                            <span className={`flex items-start justify-center w-full !text-lg mb-0.5`}>Ориентация</span>
                            <div className="w-full">
                                <button
                                    className={`py-1 w-1/2 hover:bg-hover ${showRotate ? 'bg-light-hover' : 'bg-main'}`}
                                    onClick={() => dispatch(changeRotate('horizontal'))}
                                >
                                    <span className="text-sm">Горизонтальная</span>
                                </button>
                                <button
                                    className={`py-1 w-1/2 hover:bg-hover ${showRotate ? 'bg-light-hover' : 'bg-main'}`}
                                    onClick={() => dispatch(changeRotate('vertical'))}
                                >
                                    <span className="text-sm">Вертикальная</span>
                                </button>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            <div className={`w-5.5 aspect-square sm:w-7 sm:block lg:hidden`}
                 ref={settingsRef}
            >
                <button className="h-full flex"
                        onClick={() => {
                            setShowSettings(prev => !prev);
                        }}
                >
                    <svg className='fill-text w-full h-full' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                         viewBox="0 0 50 50">
                        <path
                            d="M 22.205078 2 A 1.0001 1.0001 0 0 0 21.21875 2.8378906 L 20.246094 8.7929688 C 19.076509 9.1331971 17.961243 9.5922728 16.910156 10.164062 L 11.996094 6.6542969 A 1.0001 1.0001 0 0 0 10.708984 6.7597656 L 6.8183594 10.646484 A 1.0001 1.0001 0 0 0 6.7070312 11.927734 L 10.164062 16.873047 C 9.583454 17.930271 9.1142098 19.051824 8.765625 20.232422 L 2.8359375 21.21875 A 1.0001 1.0001 0 0 0 2.0019531 22.205078 L 2.0019531 27.705078 A 1.0001 1.0001 0 0 0 2.8261719 28.691406 L 8.7597656 29.742188 C 9.1064607 30.920739 9.5727226 32.043065 10.154297 33.101562 L 6.6542969 37.998047 A 1.0001 1.0001 0 0 0 6.7597656 39.285156 L 10.648438 43.175781 A 1.0001 1.0001 0 0 0 11.927734 43.289062 L 16.882812 39.820312 C 17.936999 40.39548 19.054994 40.857928 20.228516 41.201172 L 21.21875 47.164062 A 1.0001 1.0001 0 0 0 22.205078 48 L 27.705078 48 A 1.0001 1.0001 0 0 0 28.691406 47.173828 L 29.751953 41.1875 C 30.920633 40.838997 32.033372 40.369697 33.082031 39.791016 L 38.070312 43.291016 A 1.0001 1.0001 0 0 0 39.351562 43.179688 L 43.240234 39.287109 A 1.0001 1.0001 0 0 0 43.34375 37.996094 L 39.787109 33.058594 C 40.355783 32.014958 40.813915 30.908875 41.154297 29.748047 L 47.171875 28.693359 A 1.0001 1.0001 0 0 0 47.998047 27.707031 L 47.998047 22.207031 A 1.0001 1.0001 0 0 0 47.160156 21.220703 L 41.152344 20.238281 C 40.80968 19.078827 40.350281 17.974723 39.78125 16.931641 L 43.289062 11.933594 A 1.0001 1.0001 0 0 0 43.177734 10.652344 L 39.287109 6.7636719 A 1.0001 1.0001 0 0 0 37.996094 6.6601562 L 33.072266 10.201172 C 32.023186 9.6248101 30.909713 9.1579916 29.738281 8.8125 L 28.691406 2.828125 A 1.0001 1.0001 0 0 0 27.705078 2 L 22.205078 2 z M 23.056641 4 L 26.865234 4 L 27.861328 9.6855469 A 1.0001 1.0001 0 0 0 28.603516 10.484375 C 30.066026 10.848832 31.439607 11.426549 32.693359 12.185547 A 1.0001 1.0001 0 0 0 33.794922 12.142578 L 38.474609 8.7792969 L 41.167969 11.472656 L 37.835938 16.220703 A 1.0001 1.0001 0 0 0 37.796875 17.310547 C 38.548366 18.561471 39.118333 19.926379 39.482422 21.380859 A 1.0001 1.0001 0 0 0 40.291016 22.125 L 45.998047 23.058594 L 45.998047 26.867188 L 40.279297 27.871094 A 1.0001 1.0001 0 0 0 39.482422 28.617188 C 39.122545 30.069817 38.552234 31.434687 37.800781 32.685547 A 1.0001 1.0001 0 0 0 37.845703 33.785156 L 41.224609 38.474609 L 38.53125 41.169922 L 33.791016 37.84375 A 1.0001 1.0001 0 0 0 32.697266 37.808594 C 31.44975 38.567585 30.074755 39.148028 28.617188 39.517578 A 1.0001 1.0001 0 0 0 27.876953 40.3125 L 26.867188 46 L 23.052734 46 L 22.111328 40.337891 A 1.0001 1.0001 0 0 0 21.365234 39.53125 C 19.90185 39.170557 18.522094 38.59371 17.259766 37.835938 A 1.0001 1.0001 0 0 0 16.171875 37.875 L 11.46875 41.169922 L 8.7734375 38.470703 L 12.097656 33.824219 A 1.0001 1.0001 0 0 0 12.138672 32.724609 C 11.372652 31.458855 10.793319 30.079213 10.427734 28.609375 A 1.0001 1.0001 0 0 0 9.6328125 27.867188 L 4.0019531 26.867188 L 4.0019531 23.052734 L 9.6289062 22.117188 A 1.0001 1.0001 0 0 0 10.435547 21.373047 C 10.804273 19.898143 11.383325 18.518729 12.146484 17.255859 A 1.0001 1.0001 0 0 0 12.111328 16.164062 L 8.8261719 11.46875 L 11.523438 8.7734375 L 16.185547 12.105469 A 1.0001 1.0001 0 0 0 17.28125 12.148438 C 18.536908 11.394293 19.919867 10.822081 21.384766 10.462891 A 1.0001 1.0001 0 0 0 22.132812 9.6523438 L 23.056641 4 z M 25 17 C 20.593567 17 17 20.593567 17 25 C 17 29.406433 20.593567 33 25 33 C 29.406433 33 33 29.406433 33 25 C 33 20.593567 29.406433 17 25 17 z M 25 19 C 28.325553 19 31 21.674447 31 25 C 31 28.325553 28.325553 31 25 31 C 21.674447 31 19 28.325553 19 25 C 19 21.674447 21.674447 19 25 19 z"></path>
                    </svg>
                </button>
                <Themes show={isShowThemes} setShowThemes={setIsShowThemes} setShowSettings={setShowSettings}/>
                <div
                    className={`fixed w-45 sm:w-65 py-2 md:py-3.5 bg-main top-15 -right-1 z-50 ${showSettings ? "block" : "hidden"}
                 border-text border-2 border-solid rounded-l-xl md:rounded-l-2xl shadow-xl`}
                    onMouseEnter={() => setShowSettings(true)} onMouseLeave={() => setShowSettings(false)}
                >
                    <div className='flex flex-col'>
                        <button onMouseEnter={() => setIsShowThemes(true)}
                                onMouseLeave={() => setIsShowThemes(false)}
                                className={`
                                py-1 pl-1 border-l-2 -ml-0.5 sm:py-2 hover:bg-light-hover relative !text-sm sm:text-md
                                ${isShowThemes ? 'bg-light-hover' : 'bg-main'}`
                                }
                        >
                            Цветовые темы
                        </button>
                        <Link to="/"
                              className="flex justify-center z-50 items-center gap-1 bg-main py-1 sm:py-2 !text-sm sm:text-md hover:bg-light-hover">
                            <div className="stroke-text -ml-5 fill-transparent">
                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <polygon points="12,3 2,12 5,12 5,20 10,20 10,14 14,14 14,20 19,20 19,12 22,12"/>
                                </svg>
                            </div>
                            <span>Главная</span>
                        </Link>
                        <Link to="/statistics"
                              className="flex justify-center z-50 items-center gap-1 bg-main py-1 sm:py-2 !text-sm sm:text-md hover:bg-light-hover"
                        >
                            <div className="stroke-text -ml-5 fill-transparent">
                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="2,20 8,10 14,14 20,6" strokeWidth="1" fill="none" />
                                    <polyline points="18,6 20,6 20,8" strokeWidth="1" fill="none" />
                                </svg>
                            </div>
                            <span>Статистика</span>
                        </Link>
                        <Link to="/about"
                              className="flex z-50 justify-center items-center gap-1 bg-main py-1 sm:py-2 !text-sm sm:text-md hover:bg-light-hover"
                        >
                            <div className="stroke-text -ml-5 fill-transparent">
                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" />
                                    <circle cx="12" cy="7" r="1" />
                                    <line x1="12" y1="11" x2="12" y2="17" strokeWidth="2" />
                                </svg>
                            </div>
                            <span>О сайте</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;