import * as React from "react";
import {useEffect, useState} from "react";

type Props = {
    show: boolean,
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>,
    setShowThemes: React.Dispatch<React.SetStateAction<boolean>>
}

type Theme = 'light' | 'dark' | 'darkContrast' | 'blue' | 'green' | 'vanilla'

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

    const themes = ['darkContrast', 'green', 'blue', 'dark', 'vanilla', 'light']

    return (
        <div
            className={`
                flex justify-center items-center px-1
                absolute w-45 h-10 bg-main top-19
                rounded-l-2xl
                !duration-400 ease-in-out ${show ? "-translate-x-109" : "-translate-x-64"}
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
            {themes.map((name) => (
                <button
                    key={name}
                    onMouseEnter={() => changeTheme(name)}
                    onClick={() => changeTheme(name, true)}
                    onMouseLeave={() => changeTheme(currentTheme as Theme)}
                    className="flex justify-center items-center w-1/6 h-full p-0"
                >
                    <div
                        className={`
                            w-6 h-6 rounded-full border-2
                            bg-gradient-to-br 
                            ${name === 'darkContrast' && 'from-black to-yellow-700'}
                            ${name === 'green' && 'from-green-200 to-green-700'}
                            ${name === 'blue' && 'from-blue-300 to-blue-800'}
                            ${name === 'dark' && 'from-gray-700 to-black'}
                            ${name === 'vanilla' && 'from-orange-100 to-orange-300'}
                            ${name === 'light' && 'from-white to-gray-400'}
                            ${currentTheme === name ? 'border-white' : 'border-black'}
                        `}
                    />
                </button>
            ))}
        </div>
    );
};

export default Themes;