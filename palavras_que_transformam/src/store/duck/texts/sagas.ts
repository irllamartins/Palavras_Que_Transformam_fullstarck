import { all, apply, put, takeLatest } from "redux-saga/effects"
import { IActionType, IAxiosResponse } from "../root.types"
import { IActionText, IActionTextId, IActionUserId } from "./types"
import TextService from "../../../service/text"
import { Text } from "../../application/model/text"
import { createTextFailure, createTextRequest, createTextSuccess, findTextFailure, findTextRequest, findTextSuccess, loadTextFailure, loadTextRequest, loadTextSuccess, removeTextFailure, removeTextRequest, removeTextSuccess, updateTextFailure, updateTextRequest, updateTextSuccess } from "."

function* loadText(action: IActionType<IActionUserId>) {
    try {
        const { userId } = action.payload
        const texts: IAxiosResponse<any[]> = yield apply(
            TextService,
            TextService.getAll,
            [userId]
        )
        yield put(loadTextSuccess({ text: texts.data }))
    } catch (e) {
        yield put(loadTextFailure())
    }
}
function* createText(action: IActionType<IActionText>) {

    try {
        const { text } = action.payload
        const newUser: IAxiosResponse<Text> = yield apply(
            TextService,
            TextService.create,
            [text]
        )
        yield put<any>(createTextSuccess({ text: newUser.data }))

    } catch (e) {

        yield put(createTextFailure())
    }
}
function* findText(action: IActionType<IActionTextId>) {
    try {
        const { textId } = action.payload

        const text: IAxiosResponse<Text> = yield apply(
            TextService,
            TextService.getById,
            [textId]
        )

        yield put<any>(findTextSuccess({ text: text.data }))
    } catch (e) {
        yield put(findTextFailure())
    }
}
function* updateText(action: IActionType<IActionText>) {
    const { text } = action.payload
    try {
        const updatedText: IAxiosResponse<Text> = yield apply(
            TextService,
            TextService.updade,
            [text]
        )
        yield put<any>(updateTextSuccess({ text: updatedText.data }))
    } catch (e) {
        yield put(updateTextFailure())
    }
}

function* removeText(action: IActionType<IActionTextId>) {
    try {
        const { textId } = action.payload
        const listUpdate: IAxiosResponse<any> = yield apply(
            TextService,
            TextService.remove,
            [textId]
        )
        yield put<any>(removeTextSuccess({ textId: listUpdate.data }))
    } catch (e) {

        yield put(removeTextFailure())
    }
}
export default function* textSaga(): any {
    return yield all([
        takeLatest(loadTextRequest.type, loadText),
        takeLatest(createTextRequest.type, createText),
        takeLatest(findTextRequest.type, findText),
        takeLatest(updateTextRequest.type, updateText),
        takeLatest(removeTextRequest.type, removeText)
    ])
}