import { all, apply, put, takeLatest } from "redux-saga/effects"
import { IActionType, IAxiosResponse } from "../root.types"
import { IActionObject, IActionId, TextTypes, IActionUserId } from "./types"
import TextService from "../../../service/text"
import { createTextFailure, createTextSuccess, findTextFailure, findTextSuccess, loadTextFailure, loadTextSuccess, removeTextFailure, removeTextSuccess, updateTextFailure, updateTextSuccess } from "./actions"
import Text from "../../application/model/text"

function* loadText(action: IActionType<IActionUserId>) {
    try {
        const { userId } = action.payload
        const texts: IAxiosResponse<any[]> = yield apply(
            TextService,
            TextService.getAll,
            [userId]
        )
        yield put(loadTextSuccess(texts))
    } catch (e) {
        yield put(loadTextFailure())
    }
}
function* createText(action: IActionType<IActionObject>) {
    try {
        const { text } = action.payload
        const newPatient: IAxiosResponse<Text> = yield apply(
            TextService,
            TextService.create,
            [text]
        )
        yield put<any>(createTextSuccess(newPatient))

    } catch (e) {

        yield put(createTextFailure())
    }
}
function* findText(action: IActionType<IActionId>) {
    try {
        const { textId } = action.payload
        const text: IAxiosResponse<Text> = yield apply(
            TextService,
            TextService.getById,
            [textId]
        )
        yield put<any>(findTextSuccess(text))
    } catch (e) {
        yield put(findTextFailure())
    }
}
function* updateText(action: IActionType<IActionObject>) {
    try {
        const { text } = action.payload
        const updatedText: IAxiosResponse<Text> = yield apply(
            TextService,
            TextService.updade,
            [text]
        )
        yield put<any>(updateTextSuccess(updatedText))
    } catch (e) {
        console.log("saga",e)
        yield put(updateTextFailure())
    }
}

function* removeText(action: IActionType<IActionId>) {
    try {
        const { textId } = action.payload
        const listUpdate: IAxiosResponse<any> = yield apply(
            TextService,
            TextService.remove,
            [textId]
        )
        yield put<any>(removeTextSuccess(listUpdate))     
    } catch (e) {
       
        yield put(removeTextFailure())
    }
}
export default function* textSaga(): any {
    return yield all([
        takeLatest(TextTypes.LOAD_TEXT_REQUEST, loadText),
        takeLatest(TextTypes.CREATE_TEXT_REQUEST, createText),
        takeLatest(TextTypes.FIND_TEXT_REQUEST, findText),
        takeLatest(TextTypes.UPDATE_TEXT_REQUEST, updateText),
        takeLatest(TextTypes.REMOVE_TEXT_REQUEST, removeText)
    ])
}