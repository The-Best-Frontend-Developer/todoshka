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
                justify-center items-center px-1 z-10 lg:-z-10
                fixed sm:absolute w-45 h-7 sm:h-8 md:h-11 bg-main top-18 md:top-19 right-64
                rounded-l-2xl lg:flex
                !duration-400 ease-in-out ${show ? "flex translate-x-20 sm:-translate-x-0" : "hidden translate-x-44 sm:translate-x-64"}
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
                    onClick={() => changeTheme(name as Theme, true)}
                    className="flex justify-center items-center w-1/6 h-full p-0"
                >
                    <div
                        className={`
                            w-5 sm:w-6 aspect-square rounded-full border-1 sm:border-2
                            bg-gradient-to-br 
                            ${name === 'darkContrast' && 'from-yellow-600 to-black'}
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