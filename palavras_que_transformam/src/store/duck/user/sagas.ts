import { all, apply, put, takeLatest } from "redux-saga/effects";
import { IActionType, IAxiosResponse } from "../root.types";
import { IActionAuthentication, IActionId,IActionObject, UserTypes } from "./types";
import UserService from "../../../service/user";
import { authenticationFailure, authenticationSuccess, createUserFailure, createUserSuccess, findUserFailure, findUserSuccess, loadUserFailure, loadUserSuccess, updateUserFailure, updateUserSuccess } from "./actions";
import User from "../../application/model/user";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

function* loadUser(action: IActionType<any>) {
     try {
      //   const { user } = action.payload
         const users: IAxiosResponse<any[]> = yield apply(
             UserService,
             UserService.getAll,         
             []
         )
         yield put(loadUserSuccess(users))
     } catch (e) {
         yield put(loadUserFailure())
     }
}
function* createUser(action: IActionType<IActionObject>) {

    try {
        const { user} = action.payload
        const newPatient: IAxiosResponse<User> = yield apply(
            UserService,
            UserService.create, 
            [user]       
        )
        yield put<any>(createUserSuccess(newPatient))

    } catch (e) {
        yield put(createUserFailure())      
    }
}

function* updateUser(action: IActionType<IActionObject>) {
    try {
        const { user } = action.payload
        console.log("sagas",user)
        const updatedUser: IAxiosResponse<User> = yield apply(
            UserService,
            UserService.update, 
            [user]       
        )
        yield put<any>(updateUserSuccess(updatedUser))
    } catch (e) {
        console.log("saga",e)
        yield put(updateUserFailure())
    }
}
function* findUser(action: IActionType<IActionId>) {
    try {
        const { userId } = action.payload
        const user: IAxiosResponse<User> = yield apply(
            UserService,
            UserService.getById,
            [userId]
        )
        yield put<any>(findUserSuccess(user))
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
        takeLatest(UserTypes.LOAD_USER_REQUEST, loadUser),
        takeLatest(UserTypes.CREATE_USER_REQUEST, createUser),
        takeLatest(UserTypes.UPDATE_USER_REQUEST, updateUser),
        takeLatest(UserTypes.FIND_USER_REQUEST, findUser),
    ])
}