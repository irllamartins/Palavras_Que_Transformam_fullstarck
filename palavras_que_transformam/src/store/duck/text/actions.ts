import { action } from "typesafe-actions"
import { TextTypes } from "./types"
import { IAxiosResponse } from "../root.types"
import Text from "../../application/model/text"

export const resetCreate = () => action(TextTypes.RESET_CREATE)

export const handleDialog = (dialog: any) => action(TextTypes.HANDLE_DIALOG, { dialog })

// criação de um texto
export const createTextRequest = (text: Text) => action(TextTypes.CREATE_TEXT_REQUEST, { text })

export const createTextSuccess = (response: IAxiosResponse<Text>) => action(TextTypes.CREATE_TEXT_SUCCESS, response)

export const createTextFailure = () => action(TextTypes.CREATE_TEXT_FAILURE)

// atualizacao de um texto
export const loadTextRequest = (userId:string) => action(TextTypes.LOAD_TEXT_REQUEST,{userId})

export const loadTextSuccess = (response: IAxiosResponse<Text[]>) => action(TextTypes.LOAD_TEXT_SUCCESS, response)

export const loadTextFailure = () => action(TextTypes.LOAD_TEXT_FAILURE)

// busca um texto
export const findTextRequest = (textId: string) => action(TextTypes.FIND_TEXT_REQUEST, { textId })

export const findTextSuccess = (response: IAxiosResponse<Text>) => action(TextTypes.FIND_TEXT_SUCCESS, response)

export const findTextFailure = () => action(TextTypes.FIND_TEXT_FAILURE)

// atualizar um texto existente
export const updateTextRequest = (text: Text) => action(TextTypes.UPDATE_TEXT_REQUEST, { text })

export const updateTextSuccess = (response: IAxiosResponse<any>) => action(TextTypes.UPDATE_TEXT_SUCCESS, response)

export const updateTextFailure = () => action(TextTypes.UPDATE_TEXT_FAILURE)

// remove um texto existente
export const removeTextRequest = (textId:string) => action(TextTypes.REMOVE_USER_REQUEST, { textId })

export const removeTextSuccess = (text: any) => action(TextTypes.REMOVE_USER_SUCCESS, text)

export const removeTextFailure = () => action(TextTypes.REMOVE_USER_FAILURE)
