import userReducer from './userReducer'
import reportReducer from './reportReducer'
import breedReducer from './breedReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    user: userReducer,
    reports: reportReducer,
    breeds: breedReducer,
})

export default rootReducer