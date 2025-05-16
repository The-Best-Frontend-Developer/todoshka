import {useEffect, useRef, useState} from "react";
import Phrases from "./Phrases.tsx";

const About = () => {
    const listRef = useRef<HTMLDivElement>(null!)

    function useThrottledHeight(delay = 5000) {
        const [height, setHeight] = useState(window.innerHeight - 40);
        const timeoutRef = useRef<number | null>(null);

        useEffect(() => {
            const updateHeight = () => {
                if (timeoutRef.current) return; // пропускаем, если уже ждем

                timeoutRef.current = setTimeout(() => {
                    setHeight(window.innerHeight - 40);
                    timeoutRef.current = null;
                }, delay);
            };

            window.addEventListener('resize', updateHeight);
            updateHeight(); // вызывать один раз при монтировании

            return () => {
                window.removeEventListener('resize', updateHeight);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            };
        }, [delay]);

        return height;
    }

    return (
        <div className="flex flex-col p-10">
            <div style={{height: `${String(useThrottledHeight()) + 'px'}`}} className="gap-2">
                <h2 className="text-2xl md:text-4xl">
                    Этот сайт был сделан&nbsp;
                    <a href="https://kwork.ru/user/karavaevkir" className="!underline p-1" target="_blank"
                       rel="noopener noreferrer" title="Мой фриланс профиль">Кириллом</a>
                </h2>
                <h4 className="text-xl md:text-3xl">Тут нечего писать,</h4>
                <p className="text-xl md:text-3xl">поэтому Вы можете предложить, какую фразу хотите вставить ниже.</p>
                <div className="mt-5">
                    <p className="text-lg md:text-2xl">Для этого напишите мне на&nbsp;
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=frontendeveloper2010@mail.ru&su=Привет,%20хочу%20предложить%20вставить%20свою%20фразу%20на%20сайт!&body=Прошу%20вставить%20на%20сайт%20фразу%20%22...%22%20...%20цвета,%20пожалуйста.%20Спасибо!"
                           target="_blank" rel="noopener noreferrer" title="Кликайте"
                           className="text-blue-600 !underline">
                            почту
                        </a>
                        &nbsp;c именем(никнеймом) и фразой.
                        <br/>
                        <span>Я добавлю это в течение недели<br/></span>
                        <button onClick={() => listRef.current.scrollIntoView({behavior: "smooth", block: "start"})}>
                            <div className="inline-flex gap-1 mt-2 items-center">
                                <h5 className="text-start">Посмотрите пока уже добавленные</h5>
                                <svg className="stroke-text" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                     strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="4" x2="12" y2="16"/>
                                    <polyline points="6 12 12 18 18 12"/>
                                </svg>
                            </div>
                        </button>
                    </p>
                </div>
            </div>
            <div ref={listRef}>
                <Phrases/>
            </div>
        </div>
    );
};

export default About;