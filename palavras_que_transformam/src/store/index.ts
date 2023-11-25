import { applyMiddleware, legacy_createStore as createStore, Store } from 'redux'

import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from '@redux-devtools/extension'

import rootReducer from "./duck/root.reducer"
import rootSaga from './duck/root.sagas'
import { IUserState } from './duck/user/types'
import { ITextState } from './duck/text/types'

export interface IApplicationState {
    user: IUserState,
    text:ITextState
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<IApplicationState> = createStore(rootReducer, composeWithDevTools( applyMiddleware(sagaMiddleware)))


sagaMiddleware.run(rootSaga)

export default store
