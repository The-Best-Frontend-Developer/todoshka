import * as React from "react";
import {useEffect, useState} from "react";

type Props = {
    show: boolean,
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>,
    setShowThemes: React.Dispatch<React.SetStateAction<boolean>>
}

type Theme = 'light' | 'dark' | 'darkContrast' | 'blue' | 'green' | 'vanilla' | 'lavender'

const Themes = ({show, setShowSettings, setShowThemes}: Props) => {
    const rootElement = document.documentElement
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || rootElement.className)
    const changeTheme = (theme: Theme, change?: boolean) => {
        rootElement.className = theme
        if (change) {
            setCurrentTheme(rootElement.className)
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', currentTheme)
    }, [currentTheme])

    const themes: { name: Theme, from: string, to: string }[] = [
        { name: 'darkContrast', from: 'black', to: 'yellow-700' },
        { name: 'green', from: 'green-200', to: 'green-700' },
        { name: 'lavender', from: 'purple-200', to: 'purple-600' },
        { name: 'blue', from: 'blue-300', to: 'blue-800' },
        { name: 'vanilla', from: 'orange-100', to: 'orange-300' },
        { name: 'dark', from: 'gray-700', to: 'black' },
        { name: 'light', from: 'white', to: 'gray-400' },
    ];

    return (
        <div
            className={`
                flex justify-between items-center px-1
                absolute w-55 h-10 bg-main top-19
                rounded-l-2xl
                !duration-400 ease-in-out ${show ? "-translate-x-119" : "-translate-x-64"}
            `}
            onMouseEnter={() => {
                setShowSettings(true);
                setShowThemes(true);
            }}
            onMouseLeave={() => {
                setShowSettings(false);
                setShowThemes(false);
            }}
        >
            {themes.map(({ name, from, to }) => (
                <button
                    key={name}
                    onMouseEnter={() => changeTheme(name)}
                    onClick={() => changeTheme(name, true)}
                    onMouseLeave={() => changeTheme(currentTheme as Theme)}
                    className="flex justify-center items-center w-1/7 h-full p-0"
                >
                    <div
                        className={`
                            w-6 h-6 rounded-full border-2
                            bg-gradient-to-br from-${from} to-${to}
                            ${currentTheme === name ? 'border-white' : 'border-black'}
                        `}
                    />
                </button>
            ))}
        </div>
    );

    // return (
    //     <div className={`
    //          flex justify-between items-center px-3
    //          absolute w-65 h-10 bg-main top-24 z-10
    //          rounded-l-2xl
    //          delay-100 !duration-400 ease-in-out ${show ? "-left-63" : "left-1"}
    //          ${showSettings ? "-translate-x-65" : "translate-x-0"}`}
    //          onMouseEnter={() => {setShowSettings(true); setShowThemes(true)}}
    //          onMouseLeave={() => {setShowSettings(false); setShowThemes(false)}}
    //     >
    //         <button onMouseEnter={() => changeTheme('darkContrast')}
    //                 onClick={() => changeTheme('darkContrast', true)}
    //                 onMouseLeave={() => changeTheme(currentTheme as Theme)}
    //                 className="w-6 h-6 bg-gradient-to-br from-black to-yellow-700
    //                 rounded-full border-3 border-text"
    //         />
    //         <button onMouseEnter={() => changeTheme('green')}
    //                 onClick={() => changeTheme('green', true)}
    //                 onMouseLeave={() => changeTheme(currentTheme as Theme)}
    //                 className="w-6 h-6 bg-gradient-to-br from-green-200 to-green-700
    //                 rounded-full border-3 border-text"
    //         />
    //         <button onMouseEnter={() => changeTheme('lavender')}
    //                 onClick={() => changeTheme('lavender', true)}
    //                 onMouseLeave={() => changeTheme(currentTheme as Theme)}
    //                 className="w-6 h-6 bg-gradient-to-br from-purple-200 to-purple-600
    //                 rounded-full border-3 border-text"
    //         />
    //         <button onMouseEnter={() => changeTheme('blue')}
    //                 onClick={() => changeTheme('blue', true)}
    //                 onMouseLeave={() => changeTheme(currentTheme as Theme)}
    //                 className="w-6 h-6 bg-gradient-to-br from-blue-300 to-blue-800
    //                 rounded-full border-3 border-text"
    //         />
    //         <button onMouseEnter={() => changeTheme('vanilla')}
    //                 onClick={() => changeTheme('vanilla', true)}
    //                 onMouseLeave={() => changeTheme(currentTheme as Theme)}
    //                 className="w-6 h-6 bg-gradient-to-br from-orange-100 to-orange-300
    //                 rounded-full border-3 border-text"
    //         />
    //         <button onMouseEnter={() => changeTheme('dark')}
    //                 onClick={() => changeTheme('dark', true)}
    //                 onMouseLeave={() => changeTheme(currentTheme as Theme)}
    //                 className="w-6 h-6 bg-gradient-to-br from-gray-700 to-black
    //                 rounded-full border-3 border-text"
    //         />
    //         <button onMouseEnter={() => changeTheme('light')}
    //                 onClick={() => changeTheme('light', true)}
    //                 onMouseLeave={() => changeTheme(currentTheme as Theme)}
    //                 className="w-6 h-6 bg-gradient-to-br from-white to-gray-400
    //                 rounded-full border-3 border-text"
    //         />
    //     </div>
    // );
};

export default Themes;