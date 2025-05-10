export type Status = 'waiting' | 'progress' | 'done'

export type TypeTodo = {
    id: number,
    title: string,
    description: string,
    status: Status,
    selected?: boolean,
    animated?: boolean,
    tags: Tag[],
}

export type Tag = {
    id: number,
    name: string
}