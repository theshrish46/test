import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';


import userAuth from './features/auth-slice';

// const customMiddleware = getDefaultMiddleware({
//     serializableCheck: false
// })

const authPersistConfig = {
    key: 'auth',
    version: 1,
    storage,
}
const persistedReducer = persistReducer(authPersistConfig, userAuth)


const rootReducer = combineReducers({
    userAuth: persistedReducer,
})


export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;