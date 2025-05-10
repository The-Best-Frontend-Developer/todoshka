import {useEffect, useRef, useState} from "react";
import FoundTodos from "./FoundTodos.tsx";
import {useAppSelector} from "../../store/myHook.ts";

const Search = () => {
    const recentTags = useAppSelector(state => state.tags)
    const [isOpenedSearch, setIsOpenedSearch] = useState(false)
    const [isSearchingNow, setIsSearchingNow] = useState(false)
    const [searchRequest, setSearchRequest] = useState('')
    const searchInputRef = useRef<HTMLInputElement>(null!)
    const wholeSearchingRef = useRef<HTMLDivElement>(null!)
    const [type, setType] = useState<string>('usual')

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (wholeSearchingRef.current && !(wholeSearchingRef.current.contains(target) || target.closest('.outside'))) {
                setIsOpenedSearch(false);
                setType('usual')
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative outside" ref={wholeSearchingRef}>
            <div className="flex gap-2">
                <button className="aspect-square w-5.5 sm:w-7"
                        onClick={() => {
                            if (!isOpenedSearch) {
                                setTimeout(() => {
                                    searchInputRef.current.focus()
                                }, 500)
                            }
                            setSearchRequest('');
                            setIsOpenedSearch(prevState => !prevState);
                            setType('usual')
                        }}
                >
                    <svg className="fill-text w-full h-full" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                         viewBox="0 0 50 50">
                        <path
                            d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                    </svg>
                </button>
                <input
                    placeholder="Поиск"
                    ref={searchInputRef}
                    value={searchRequest}
                    onFocus={() => setIsSearchingNow(true)}
                    onChange={(e) => {
                        setSearchRequest(e.target.value)
                        setType('usual')
                    }}
                    className={`${isOpenedSearch ? `w-40 !p-1 sm:!p-2 sm:w-40 lg:w-50 ${isSearchingNow ? '!border-1 !border-solid !border-text' : ''}` : "w-0 !p-0 !border-none"} input duration-300`}
                />
            </div>
            {(isSearchingNow && isOpenedSearch) &&
                <div
                    className="flex flex-col gap-1 absolute z-40 top-12 left-0 w-full border-2 border-solid border-text p-2 rounded-md bg-second miniInset">
                    <div
                        className="flex flex-col gap-1 py-2 max-h-[40vh] md:max-h-[70vh] overflow-y-auto scrollbar-custom">
                        <FoundTodos value={searchRequest} searchRequest={searchRequest}
                                    setIsSearchingNow={setIsSearchingNow} type={type}/>
                    </div>
                    <div className="w-full max-h-0 border-1 border-solid border-text"></div>
                    <div className="flex flex-col">
                        {recentTags.length !== 0 && (
                            <>
                                <span className="md:text-sm 2xl:text-lg">Поиск по тегам:</span>
                                <div className="flex gap-1 sm:gap-2 flex-wrap">
                                    {recentTags.map((tag) => (
                                        <button
                                            className="flex items-center bg-extra rounded-lg py-0.5 px-1 sm:px-1.5"
                                            key={tag.id}
                                            onClick={() => {
                                                setType(tag.name);
                                                setSearchRequest('Тег: ' + tag.name)
                                            }}
                                        >
                                    <span className="text-xs sm:text-sm"
                                          title={tag.name.length > 13 ? tag.name : undefined}>{tag.name.length > 13 ? tag.name.slice(0, 13) + "..." : tag.name}</span>
                                        </button>))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            }
        </div>
    );
};

export default Search;