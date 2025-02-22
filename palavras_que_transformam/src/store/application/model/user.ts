export interface User {
    id: string | undefined,
    name: string | undefined,
    email: string | undefined,
    password: string | undefined,
    goal?: number | undefined,
    point?: number | undefined
}
export interface NewUser {
    name: string | undefined,
    email: string | undefined,
    password: string | undefined,
}
