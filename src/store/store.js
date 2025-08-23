import { createStore, combineReducers } from "redux"
import { toyReducer } from "./reducers/toy.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
})


export const store = createStore(rootReducer)
window.gStore = store