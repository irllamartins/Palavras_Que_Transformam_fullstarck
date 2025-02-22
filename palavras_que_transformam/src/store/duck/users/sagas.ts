import { all, apply, put, takeLatest } from "redux-saga/effects";
import { IActionType, IAxiosResponse } from "../root.types";
import { IActionNewUser, IActionUser, IActionUserId } from "./types";
import UserService from "../../../service/user";
import {User} from "../../application/model/user";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import { 
    createUserFailure,
    createUserRequest,
    createUserSuccess, 
    findUserFailure, 
    findUserRequest, 
    findUserSuccess, 
    loadUserFailure, 
    loadUserRequest, 
    loadUserSuccess,
    updateUserFailure,
    updateUserRequest,
    updateUserSuccess
 } from ".";


function* loadUser(action: IActionType<any>) {

     try {
      //   const { user } = action.payload
         const users: IAxiosResponse<any[]> = yield apply(
             UserService,
             UserService.getAll,         
             []
         )
         yield put(loadUserSuccess({users: users.data}))
     } catch (e) {
         yield put(loadUserFailure())
     }
}
function* createUser(action: IActionType<IActionNewUser>) {
    try {
        const { user} = action.payload
        const newUser: IAxiosResponse<User> = yield apply(
            UserService,
            UserService.create, 
            [user]       
        )
        yield put<any>(createUserSuccess({user:newUser.data}))

    } catch (e) {
        yield put(createUserFailure())      
    }
}

function* updateUser(action: IActionType<IActionUser>) {
    try {
        const { user } = action.payload
        console.log("sagas",user)
        const updatedUser: IAxiosResponse<User> = yield apply(
            UserService,
            UserService.update, 
            [user]       
        )
        yield put<any>(updateUserSuccess({user: updatedUser.data}))
    } catch (e) {
        console.log("saga",e)
        yield put(updateUserFailure())
    }
}
function* findUser(action: IActionType<IActionUserId>) {
    try {
        const { userId } = action.payload
        const user: IAxiosResponse<User> = yield apply(
            UserService,
            UserService.getById,
            [userId]
        )
        yield put<any>(findUserSuccess({user:user.data}))
    } catch (e) {
        yield put(findUserFailure())
    }
}
/*function* authentication(action: IActionType<IActionAuthentication>) {
    try {
        const { textId } = action.payload
        const text: IAxiosResponse<User> = yield apply(
            UserService,
            UserService.create, 
            [user]     
        )
        yield put<any>(authenticationSuccess(text))
    } catch (e) {
        yield put(authenticationFailure())
    }
}*/
export default function* userSaga(): any {
    return yield all([
        takeLatest(loadUserRequest.type, loadUser),
        takeLatest(createUserRequest.type, createUser),
        takeLatest(updateUserRequest.type, updateUser),
        takeLatest(findUserRequest.type, findUser),
    ])
}