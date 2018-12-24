import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

// import all reducer
// import RootNavigator from '../../navigators/RootNavigator';
import authReducer from './auth';
import movieReducer from "./movie";

// const reducerRouter = createNavigationReducer(RootNavigator);

const reducers = combineReducers({
    // router: reducerRouter,
    // products: productsReducer,
    form: formReducer,
    auth: authReducer,
    movie: movieReducer
    
});

export default reducers;