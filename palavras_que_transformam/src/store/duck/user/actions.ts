import { action } from "typesafe-actions"
import { UserTypes } from "./types"
import { IAxiosResponse } from "../root.types"
import User from "../../application/model/user"


export const authenticationRequest = (email: string, password: string) => action(UserTypes.AUTHENTICATION_USER_REQUEST, { email, password })

export const authenticationSuccess = (user: User) => action(UserTypes.AUTHENTICATION_USER_SUCCESS, { user })

export const authenticationFailure = () => action(UserTypes.AUTHENTICATION_USER_FAILURE)

// actions para criar nono usuario
export const createUserRequest = (user: User) => action(UserTypes.CREATE_USER_REQUEST, { user })

export const createUserSuccess = (response: IAxiosResponse<User>) => action(UserTypes.CREATE_USER_SUCCESS, response)

export const createUserFailure = () => action(UserTypes.CREATE_USER_FAILURE)

// actions para atualizar um usuaruo existente
export const updateUserRequest = (user: User) => action(UserTypes.UPDATE_USER_REQUEST, { user })

export const updateUserSuccess = (response: IAxiosResponse<any>) => action(UserTypes.UPDATE_USER_SUCCESS, response)
     
export const updateUserFailure = () => action(UserTypes.UPDATE_USER_FAILURE)

// actions para carregar todos usuarios
export const loadUserRequest = () => action(UserTypes.LOAD_USER_REQUEST,)

export const loadUserSuccess = (response: IAxiosResponse<any[]>) => action(UserTypes.LOAD_USER_SUCCESS, response)

export const loadUserFailure = () => action(UserTypes.LOAD_USER_FAILURE)

// busca um usuario
export const findUserRequest = (userId: string) => action(UserTypes.FIND_USER_REQUEST, { userId })

export const findUserSuccess = (response: IAxiosResponse<User>) => action(UserTypes.FIND_USER_SUCCESS, response)

export const findUserFailure = () => action(UserTypes.FIND_USER_FAILURE)
