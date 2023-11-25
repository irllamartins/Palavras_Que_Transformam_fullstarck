import { AllEffect, ForkEffect, all, fork, takeLatest } from 'redux-saga/effects'

import userSaga from './user/sagas'
import textSaga from './text/sagas'

export default function* rootSaga():Generator<AllEffect<ForkEffect<any>>> {
    return yield all([
        fork(userSaga),
        fork(textSaga)
    ])
}
