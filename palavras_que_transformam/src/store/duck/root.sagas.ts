import { AllEffect, ForkEffect, all, fork } from 'redux-saga/effects'

import userSaga from './users/sagas'
import textSaga from './texts/sagas'
import rankingSaga from './ranking/sagas'

export default function* rootSaga():Generator<AllEffect<ForkEffect<any>>> {
    return yield all([
        fork(userSaga),
        fork(textSaga),
        fork(rankingSaga)
    ])
}
