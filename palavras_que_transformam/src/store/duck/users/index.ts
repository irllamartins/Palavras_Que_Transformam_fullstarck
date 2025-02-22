import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AsyncStateStatus } from '../root.types'
import { IActionAuthentication, IActionNewUser, IActionUser, IActionUserId, IActionUserLoad, IUserState } from './types'
import { User } from '../../application/model/user'

const initialState: IUserState = {
    create: {
        user: null,
        status: AsyncStateStatus.INITIAL
    },
    list: {
        users: [],
        status: AsyncStateStatus.INITIAL
    }

}

export const UserSlice = createSlice({
    name: '@user',
    initialState,
    reducers: {
        authenticationRequest(state, action: PayloadAction<IActionAuthentication>) {
            state.create.status = AsyncStateStatus.LOADING
        },
        authenticationSuccess(state, action: PayloadAction<IActionUser>) {
            const { user } = action.payload
            state.create.user = user
            state.create.status = AsyncStateStatus.SUCCESS
        },
        authenticationFailure(state) {
            state.create.status = AsyncStateStatus.FAILURE
        },
        createUserRequest(state, action: PayloadAction<IActionNewUser>) {
            state.create.status = AsyncStateStatus.LOADING
        },
        createUserSuccess(state, action: PayloadAction<IActionUser>) {
            const { user } = action.payload
            const updateList = [user,...state.list.users]
            state.create.user = user
            state.list.users= updateList 
            state.create.status = AsyncStateStatus.SUCCESS
        },
        createUserFailure(state) {
            state.create.status = AsyncStateStatus.FAILURE
        },
        loadUserRequest(state, action: PayloadAction<IActionUserLoad>) {
            state.list.status = AsyncStateStatus.LOADING
        },
        loadUserSuccess(state, action: PayloadAction<IActionUserLoad>) {
            state.list.users= action.payload.users
            state.list.status = AsyncStateStatus.SUCCESS
        },
        loadUserFailure(state) {
            state.list.users= []
            state.create.status = AsyncStateStatus.FAILURE
        },
        findUserRequest(state, action: PayloadAction< IActionUserId>) {
            state.create.status = AsyncStateStatus.LOADING
        },
        findUserSuccess(state, action: PayloadAction<IActionUser>) {
            state.create.user = action.payload.user
            state.create.status = AsyncStateStatus.SUCCESS
        },
        findUserFailure(state) {
            state.create.user = null
            state.create.status = AsyncStateStatus.FAILURE
        },
        updateUserRequest(state, action: PayloadAction<IActionUser>) {
            state.create.status = AsyncStateStatus.LOADING
        },
        updateUserSuccess(state, action: PayloadAction<IActionUser>) {
            const { user } = action.payload
            const updadedList = state.list.users?.map((userItem:User) =>
                userItem.id === user.id ? user : user
            )
            state.list.users= updadedList
            state.create.status = AsyncStateStatus.SUCCESS
        },
        updateUserFailure(state) {
            state.create.status = AsyncStateStatus.FAILURE
        }

    }
})

export const {
    createUserRequest,
    createUserSuccess,
    createUserFailure,
    findUserRequest,
    findUserFailure,
    findUserSuccess,
    authenticationFailure,
    authenticationRequest,
    authenticationSuccess,
    loadUserFailure,
    loadUserRequest,
    loadUserSuccess,
    updateUserFailure,
    updateUserRequest,
    updateUserSuccess
}= UserSlice.actions

export default UserSlice.reducer
