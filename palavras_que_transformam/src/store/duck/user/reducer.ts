import { Reducer } from 'redux'
import { createReducer } from 'reduxsauce'
import { UserTypes, IUserState } from './types'
import { IActionType, success, failure, request } from '../root.types'
import User from '../../application/model/user'

const INITIAL_STATE: IUserState = {
    create: {
        user: new User(),
        loading: false,
        success: false,
        error: false
    },
    list: {
        users: [],
        loading: false,
        success: false,
        error: false
    }

}
// reducers para criar novo usuario
export const createUserRequest = (state: IUserState = INITIAL_STATE,
    action: IActionType<any>) => {
  //  console.log("request", action.payload)
    return { ...state, create: request(state.create) }
}

export const createUserSuccess = (
    state: IUserState = INITIAL_STATE,
    action: IActionType<{ user: User }>) => {
    const { user } = action.payload
    const updateList = [user].concat(state.list.users)
    return {
        ...state,
        create: { ...state.create, user },
        list: success({ ...state.list, users: updateList })
    }
}

export const createUserFailure = (state: IUserState = INITIAL_STATE) => {
    return {
        ...state,
        list: failure(state.list)
    }
}

// reducers para carregar listagem dO ACOMPANHAMENTO
export const loadUserRequest = (state: IUserState = INITIAL_STATE,
    action: IActionType<any>) => {
    return { ...state, list: request({ ...state.list }) }
}

export const loadUserSuccess = (
    state: IUserState = INITIAL_STATE,
    action: IActionType<{ data: any[], headers: any }>) => {
    const { data, headers } = action.payload
    return {
        ...state,
        list: success({ ...state.list, users: data })
    }
}

export const loadUserFailure = (state: IUserState = INITIAL_STATE) => {
    return {
        ...state,
        list: failure(state.list)
    }
}

// reducers para carregar listagem dO ACOMPANHAMENTO
export const authenticationRequest = (state: IUserState = INITIAL_STATE,
    action: IActionType<{email: string, password: string}>) => {
    return { ...state, create: request({ ...state.create }) }
}

export const authenticationSuccess = (
    state: IUserState = INITIAL_STATE,
    action: IActionType<{ data: User }>) => {
    const { data } = action.payload
    return {
        ...state,
        create: success({ ...state.create, user: data })
    }
}

export const authenticationFailure = (state: IUserState = INITIAL_STATE) => {
    return {
        ...state,
        create: failure(state.create)
    }
}


// reducers para atualizar dados do text
export const updateUserRequest = (state: IUserState = INITIAL_STATE, action: IActionType<{ user:User}>) => {
    console.log("REDUCER",action.payload.user)
    return { ...state, create: request({ ...state.create }) }
}

export const updateUserSuccess = (state: IUserState= INITIAL_STATE,
    action: IActionType<{ data: any }>) => {
    const { data } = action.payload
    const updadedList = state.list.users.map((user: any) =>
        user.id === data.id ? data : user     
    )
    return {
        ...state,
       // create: success({ ...state.create, user: data }),
        list: { ...state.list, users: updadedList}
    }
}

export const updateUserFailure = (state: IUserState = INITIAL_STATE) => {
    return {
        ...state,
        create: failure(state.create)
    }
}

// reducers para procura um usuario especifico
export const findUserRequest = (state: IUserState = INITIAL_STATE,
    action: IActionType<{ userId: string }>) => {
    return { ...state, create: request({ ...state.create }) }
}
export const findUserSuccess = (
    state: IUserState = INITIAL_STATE,
    action: IActionType<{ data: User }>) => {
    const { data } = action.payload
    return {
        ...state,
        create: success({ ...state.create, user: data })
    }
}

export const findUserFailure = (state: IUserState = INITIAL_STATE) => {
    return {
        ...state,
        create: failure(state.create)
    }
}
const reducer: Reducer<IUserState> = createReducer<IUserState>(INITIAL_STATE, {
    [UserTypes.LOAD_USER_REQUEST]: loadUserRequest,
    [UserTypes.LOAD_USER_SUCCESS]: loadUserSuccess,
    [UserTypes.LOAD_USER_FAILURE]: loadUserFailure,

    [UserTypes.CREATE_USER_REQUEST]: createUserRequest,
    [UserTypes.CREATE_USER_SUCCESS]: createUserSuccess,
    [UserTypes.CREATE_USER_FAILURE]: createUserFailure,

    [UserTypes.UPDATE_USER_REQUEST]: updateUserRequest,
    [UserTypes.UPDATE_USER_SUCCESS]: updateUserSuccess,
    [UserTypes.UPDATE_USER_FAILURE]: updateUserFailure,

    [UserTypes.FIND_USER_REQUEST]: findUserRequest,
    [UserTypes.FIND_USER_SUCCESS]: findUserSuccess,
    [UserTypes.FIND_USER_FAILURE]: findUserFailure,

    [UserTypes.AUTHENTICATION_USER_REQUEST]: authenticationRequest,
    [UserTypes.AUTHENTICATION_USER_SUCCESS]: authenticationSuccess,
    [UserTypes.AUTHENTICATION_USER_FAILURE]: authenticationFailure,
})
export default reducer    