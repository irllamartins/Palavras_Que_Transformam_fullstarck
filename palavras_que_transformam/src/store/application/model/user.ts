import { Achievements } from "./achievements"

export enum UserType {
    admin = "admin",
    writer = "writer"
}

export interface User {
    id: string | undefined,
    name: string | undefined,
    email: string | undefined,
    password: string | undefined,
    achievements?: Achievements[]
    goal?: number | undefined,
    point?: number | undefined,
    type: UserType
}
export interface NewUser {
    name: string | undefined,
    email: string | undefined,
    password: string | undefined,
    type: UserType
}
