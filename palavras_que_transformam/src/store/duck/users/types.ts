import { NewUser, User }from "../../application/model/user"
import { IComponentState } from "../root.types"

export interface IUserState {
    readonly create: ICreateState
    readonly list: IListState
}
export interface ICreateState extends IComponentState {
    readonly user: User | null
}
export interface IListState extends IComponentState {
    readonly users: User[] | []
}

export interface IActionUser {
    readonly user: User
}
export interface IActionNewUser {
    readonly user: NewUser
}
export interface IActionUserLoad {
    readonly users: User[]
}
export interface IActionUserId {
    readonly userId: string
}
export interface IActionAuthentication{
    readonly email:string
    readonly password:string
}