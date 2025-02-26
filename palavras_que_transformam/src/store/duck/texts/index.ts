import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AsyncStateStatus } from '../root.types'
import { IActionDialog, IActionText, IActionTextId, IActionTextLoad, IActionUserId, ITextState } from './types'
import { Text, TextType } from '../../application/model/text'
import moment from 'moment'

const initialState: ITextState = {
    create: {
        text: null,
        status: AsyncStateStatus.INITIAL
    },
    list: {
        texts: [],
        status: AsyncStateStatus.INITIAL
    },
    dialog: {
        open: false,
        type: TextType.COMMON
    }

}

export const TextSlice = createSlice({
    name: '@text',
    initialState,
    reducers: {
        resetCreate(state) {
            state.create = {
                text: null,
                status: AsyncStateStatus.SUCCESS
            }
        },
        handleDialog(state, action: PayloadAction<IActionDialog>) {
            state.dialog.open = action.payload.open
            state.dialog.type = action.payload.type
        }
        ,
        createTextRequest(state, action: PayloadAction<IActionText>) {
            state.create.status = AsyncStateStatus.LOADING
        },
        createTextSuccess(state, action: PayloadAction<IActionText>) {
            state.create.text = action.payload.text
            state.list.texts = [...state.list.texts, action.payload.text].sort((a: Text, b: Text) => {
                const dateA = moment(a.update_at);
                const dateB = moment(b.update_at);
                return dateB.isBefore(dateA) ? -1 : dateB.isAfter(dateA) ? 1 : 0;
              } )
            state.create.status = AsyncStateStatus.SUCCESS
        },
        createTextFailure(state) {
            state.create.status = AsyncStateStatus.FAILURE
        },
        loadTextRequest(state, action: PayloadAction<IActionUserId>) {
            state.list.status = AsyncStateStatus.LOADING
        },
        loadTextSuccess(state, action: PayloadAction<IActionTextLoad>) {
            state.list.texts = action.payload.text
            state.list.status = AsyncStateStatus.SUCCESS
        },
        loadTextFailure(state) {
            state.list.texts = []
            state.create.status = AsyncStateStatus.FAILURE
        },
        findTextRequest(state, action: PayloadAction<IActionTextId>) {
            state.create.status = AsyncStateStatus.LOADING
        },
        findTextSuccess(state, action: PayloadAction<IActionText>) {
            state.create.text = action.payload.text
            state.create.status = AsyncStateStatus.SUCCESS
        },
        findTextFailure(state) {
            state.create.text = null
            state.create.status = AsyncStateStatus.FAILURE
        },
        updateTextRequest(state, action: PayloadAction<IActionText>) {
            state.create.status = AsyncStateStatus.LOADING
        },
        updateTextSuccess(state, action: PayloadAction<IActionText>) {
            const { text } = action.payload
            const updadedList = state.list.texts?.map((textItem: Text) =>
                textItem.id !== text.id ? textItem : text
            ).sort((a: Text, b: Text) => {
                const dateA = moment(a.update_at);
                const dateB = moment(b.update_at);
                return dateB.isBefore(dateA) ? -1 : dateB.isAfter(dateA) ? 1 : 0;
              } )
            state.list.texts = updadedList
            state.create.text = text
            state.create.status = AsyncStateStatus.SUCCESS
        },
        updateTextFailure(state) {
            state.create.status = AsyncStateStatus.FAILURE
        },
        removeTextRequest(state, action: PayloadAction<IActionTextId>) {

            state.list.status = AsyncStateStatus.LOADING
        },
        removeTextSuccess(state, action: PayloadAction<IActionTextId>) {
            const { textId } = action.payload
            const updadedList = state.list.texts?.filter((text: any) => textId !== text.id)
            state.list.texts = updadedList
            state.list.status = AsyncStateStatus.SUCCESS
        },
        removeTextFailure(state) {
            state.list.status = AsyncStateStatus.FAILURE
        },

    }
})

export const {
    createTextFailure,
    createTextRequest,
    createTextSuccess,
    findTextFailure,
    findTextRequest,
    findTextSuccess,
    handleDialog,
    loadTextFailure,
    loadTextRequest,
    loadTextSuccess,
    removeTextFailure,
    removeTextRequest,
    removeTextSuccess,
    resetCreate,
    updateTextFailure,
    updateTextRequest,
    updateTextSuccess
} = TextSlice.actions

export default TextSlice.reducer
