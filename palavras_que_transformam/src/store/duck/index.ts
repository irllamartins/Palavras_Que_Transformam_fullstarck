import { Action, configureStore, Store, ThunkAction } from '@reduxjs/toolkit'

import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from '@redux-devtools/extension'

import users from './users'
import texts from './texts'

import rootSaga from './root.sagas'
import { IUserState } from './users/types'
import { ITextState } from './texts/types'

export interface IApplicationState {
    users: IUserState,
    texts: ITextState
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<IApplicationState> = configureStore({
    reducer: {
        texts,
        users
    },
    devTools: process.env.REACT_APP_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
})


sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
