import { Reducer } from 'redux'
import { createReducer } from 'reduxsauce'
import { TextTypes, ITextState } from './types'
import { IActionType, success, failure, request } from '../root.types'
import Text from '../../application/model/text'

const INITIAL_STATE: ITextState = {
    create: {
        text: new Text(),
        loading: false,
        success: false,
        error: false
    },
    list: {
        texts: [],
        loading: false,
        success: false,
        error: false
    },
    dialog: {
        open: false,
        type: TextTypes.COMMON
    }

}

export const resetCreate = (state: ITextState = INITIAL_STATE) => {
    const reset = {
        text: new Text(),
        loading: false,
        success: false,
        error: false
    }
    return {
        ...state,
        create: reset
    }
}

// reducers para mudar estado do Dialog
export const handleDialog = (state: ITextState = INITIAL_STATE,
    action: IActionType<any>) => {
    const { dialog } = action.payload
    return { ...state, dialog }
}

// reducers para criar novo texto
export const createTextRequest = (state: ITextState = INITIAL_STATE,
    action: IActionType<any>) => {
    return { ...state, create: request(state.create) }
}

export const createTextSuccess = (
    state: ITextState = INITIAL_STATE,
    action: IActionType<{ text: Text }>) => {
    const { text } = action.payload
    const updateList = [text].concat(state.list.texts)
    return {
        ...state,
        create: { ...state.create, text },
        list: success({ ...state.list, texts: updateList })
    }
}

export const createTextFailure = (state: ITextState = INITIAL_STATE) => {
    return {
        ...state,
        list: failure(state.list)
    }
}

// reducers para carregar listagem dos textos
export const loadTextRequest = (state: ITextState = INITIAL_STATE,
    action: IActionType<{userId:string}>) => {
    return { ...state, list: request({ ...state.list }) }
}

export const loadTextSuccess = (
    state: ITextState = INITIAL_STATE,
    action: IActionType<{ data: any[], headers: any }>) => {
    const { data, headers } = action.payload
    return {
        ...state,
        list: success({ ...state.list, texts: data })
    }
}

export const loadTextFailure = (state: ITextState = INITIAL_STATE) => {
    return {
        ...state,
        list: failure(state.list)
    }
}

// reducers para procura um texto especifico
export const findTextRequest = (state: ITextState = INITIAL_STATE,
    action: IActionType<{ textId: string }>) => {
    return { ...state, create: request({ ...state.create }) }
}
export const findTextSuccess = (
    state: ITextState = INITIAL_STATE,
    action: IActionType<{ data: Text }>) => {
    const { data } = action.payload
    return {
        ...state,
        create: success({ ...state.create, text: data })
    }
}

export const findTextFailure = (state: ITextState = INITIAL_STATE) => {
    return {
        ...state,
        create: failure(state.create)
    }
}


// reducers para atualizar dados do text
export const updateTextRequest = (state: ITextState = INITIAL_STATE, action: IActionType<{ text: Text}>) => {
    return { ...state, create: request({ ...state.create }) }
}

export const updateTextSuccess = (state: ITextState = INITIAL_STATE,
    action: IActionType<{ data: any }>) => {
    const { data } = action.payload
    const updadedList = state.list.texts.map((text: any) =>
        text.id === data.id ? data : text  
    )
    return {
        ...state,
        create: success({ ...state.create, text: data }),
        list: { ...state.list, texts: updadedList}
    }
}

export const updateTextFailure = (state: ITextState = INITIAL_STATE) => {
    return {
        ...state,
        create: failure(state.create)
    }
}


// reducers para remover um texto especifico
export const removeTextRequest = (state: ITextState = INITIAL_STATE, action: IActionType<{  textId: string }>) => {
    return { ...state, list: request({ ...state.list }) }
}

export const removeTextSuccess = (state: ITextState = INITIAL_STATE,
    action: IActionType<{ textId: string }>) => {
    const { textId } = action.payload
    const updadedList = state.list.texts?.filter((text: any) => textId !==text.id)
    return {
        ...state,
        list: success({ ...state.list, texts: updadedList })
    }
}

export const removeTextFailure = (state: ITextState = INITIAL_STATE) => {
    return {
        ...state,
        list: failure(state.list)
    }
}

const reducer: Reducer<ITextState> = createReducer<ITextState>(INITIAL_STATE, {
    [TextTypes.RESET_CREATE]: resetCreate,
    [TextTypes.HANDLE_DIALOG]: handleDialog,

    [TextTypes.LOAD_TEXT_REQUEST]: loadTextRequest,
    [TextTypes.LOAD_TEXT_SUCCESS]: loadTextSuccess,
    [TextTypes.LOAD_TEXT_FAILURE]: loadTextFailure,

    [TextTypes.CREATE_TEXT_REQUEST]: createTextRequest,
    [TextTypes.CREATE_TEXT_SUCCESS]: createTextSuccess,
    [TextTypes.CREATE_TEXT_FAILURE]: createTextFailure,

    [TextTypes.FIND_TEXT_REQUEST]: findTextRequest,
    [TextTypes.FIND_TEXT_SUCCESS]: findTextSuccess,
    [TextTypes.FIND_TEXT_FAILURE]: findTextFailure,

    [TextTypes.UPDATE_TEXT_REQUEST]: updateTextRequest,
//   [TextTypes.UPDATE_TEXT_SUCCESS]: updateTextSuccess,
    [TextTypes.UPDATE_TEXT_FAILURE]: updateTextFailure,

    [TextTypes.REMOVE_TEXT_REQUEST]: removeTextRequest,
    [TextTypes.REMOVE_TEXT_SUCCESS]: removeTextSuccess,
    [TextTypes.REMOVE_TEXT_FAILURE]: removeTextFailure,
})
export default reducer    