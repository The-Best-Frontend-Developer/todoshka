type Phrase = {
    id: number,
    title?: string,
    body: string,
    from: string,
    date: string
}

const Phrases = () => {
    const phrases: Phrase[] = [
        {
            id: 1,
            title: 'Первое сообщение от разработчика',
            body: 'Всем привет, буду рад, если пришлете сообщение',
            from: "Разработчик",
            date: "16.05.25"
        },
    ]

    return (
        <div className="flex flex-col bg-extra p-2 gap-2 rounded-xl w-[80vw] justify-self-center shadowItem">
            <h2 className="text-base sm:text-xl ml-5">Ваши сообщения</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-5 max-h-[80dvh] overflow-y-auto scrollbar-custom">
                {phrases.map((el) =>
                    <div key={el.id} className="bg-hover p-2 rounded-lg miniInset">
                        <h3 className="text-base sm:text-xl">{el.title ? el.title : '***'}</h3>
                        <p>{el.body}</p>
                        <p className="ml-4">{`${el.from} (${el.date})`}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Phrases;