import { combineReducers } from 'redux'

import user from './user/reducer'
import text from './text/reducer'

const createRootReducer = combineReducers({
    user,
    text
})

export default createRootReducer
