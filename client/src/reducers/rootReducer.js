import userReducer from './userReducer'
import reportReducer from './reportReducer'
import breedReducer from './breedReducer'
import uiReducer from './uiReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    user: userReducer,
    reports: reportReducer,
    breeds: breedReducer,
    ui: uiReducer, 
})

export default rootReducer