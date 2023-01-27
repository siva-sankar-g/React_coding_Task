import { createStore, combineReducers } from 'redux';
import userReducer from './reducer'



const rootReducer = combineReducers({
    userReducer
});

const store = createStore(rootReducer)

export default store;

