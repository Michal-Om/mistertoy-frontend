import { legacy_createStore as createStore, combineReducers, compose, } from "redux"
import { toyReducer } from "./reducers/toy.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())
window.gStore = store

//combineReducers: combine toy & user reducers.
//composeEnhancers: enable Redux DevTools if available.
