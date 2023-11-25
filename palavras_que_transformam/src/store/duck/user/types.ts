import User from "../../application/model/user"
import { IComponentState } from "../root.types"
import { createTypes } from 'reduxsauce'

export const UserTypes = createTypes(`

    LOAD_USER_SUCCESS
    LOAD_USER_FAILURE 
    LOAD_USER_REQUEST

    CREATE_USER_SUCCESS
    CREATE_USER_FAILURE 
    CREATE_USER_REQUEST

    UPDATE_USER_SUCCESS
    UPDATE_USER_FAILURE 
    UPDATE_USER_REQUEST

    FIND_USER_SUCCESS
    FIND_USER_FAILURE 
    FIND_USER_REQUEST

    AUTHENTICATION_USER_SUCCESS
    AUTHENTICATION_USER_FAILURE 
    AUTHENTICATION_USER_REQUEST
`,
    {
        prefix: '@user/'
    }
)
export interface IUserState {
    readonly create: ICreateState
    readonly list: IListState
}
export interface ICreateState extends IComponentState {
    readonly user: User
}
export interface IListState extends IComponentState {
    readonly users: []
}

export interface IActionObject {
    readonly user: User
}
export interface IActionId {
    readonly userId: string
}
export interface IActionAuthentication{
    readonly email:string
    readonly password:string
}