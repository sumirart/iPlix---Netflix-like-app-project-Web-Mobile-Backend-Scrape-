import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

// import all reducer
// import RootNavigator from '../../navigators/RootNavigator';
// import productsReducer from './products';
import authReducer from './auth';

// const reducerRouter = createNavigationReducer(RootNavigator);

const reducers = combineReducers({
    // router: reducerRouter,
    // products: productsReducer,
    form: formReducer,
    auth: authReducer
});

export default reducers;