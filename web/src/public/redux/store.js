import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import { AsyncStorage } from 'react-native';

// import reducers from '../reducers';
import reducers from './reducers';
import middlewares from './middlewares';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

// const store = createStore(
//     reducers,
//     applyMiddleware(...middlewares)
// );

// export default store;