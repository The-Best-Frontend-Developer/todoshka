export type Status = 'waiting' | 'progress' | 'done'

export type TypeTodo = {
    id: number,
    title: string,
    description: string,
    status: Status
}