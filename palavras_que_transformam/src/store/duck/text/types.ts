import { TypeText } from "@mui/material"
import Text from "../../application/model/text"
import { IComponentState } from "../root.types"
import { createTypes } from 'reduxsauce'

export const TextTypes = createTypes(`
    RESET_CREATE
    HANDLE_DIALOG

    LOAD_TEXT_SUCCESS
    LOAD_TEXT_FAILURE 
    LOAD_TEXT_REQUEST

    CREATE_TEXT_SUCCESS
    CREATE_TEXT_FAILURE 
    CREATE_TEXT_REQUEST

    FIND_TEXT_SUCCESS
    FIND_TEXT_FAILURE 
    FIND_TEXT_REQUEST

    UPDATE_TEXT_SUCCESS
    UPDATE_TEXT_FAILURE 
    UPDATE_TEXT_REQUEST

    REMOVE_TEXT_SUCCESS
    REMOVE_TEXT_FAILURE 
    REMOVE_TEXT_REQUEST
`,
    {
        prefix: '@text/'
    }
)
export interface ITextState {
    readonly create: ICreateState
    readonly list: IListState
    readonly dialog: IDialogState
}
export interface ICreateState extends IComponentState {
    readonly text: Text
}
export interface IListState extends IComponentState {
    readonly texts: []
}
export interface IDialogState {
    readonly open: boolean
    readonly type: string
}
export interface IActionObject {
    readonly text: Text
}
export interface IActionId {
    readonly textId: string
}
export interface IActionUserId {
    readonly userId: string
}