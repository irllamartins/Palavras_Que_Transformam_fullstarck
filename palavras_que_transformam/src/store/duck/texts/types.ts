import { TypeText } from "@mui/material"
import {Text} from "../../application/model/text"
import { IComponentState } from "../root.types"

export interface ITextState {
    readonly create: ICreateState
    readonly list: IListState
    readonly dialog: IActionDialog
}
export interface ICreateState extends IComponentState {
    readonly text: Text | null
}
export interface IListState extends IComponentState {
    readonly texts: Text[] | []
}
export interface IActionDialog {
    readonly open: boolean
    readonly type?: string
}
export interface IActionText {
    readonly text: Text
}
export interface IActionTextLoad {
    readonly text: Text[]
}
export interface IActionTextId {
    readonly textId: string
}
export interface IActionUserId {
    readonly userId: string
}