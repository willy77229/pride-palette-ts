import { compose, legacy_createStore as createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

export type RootState = ReturnType<typeof rootReducer>

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart']
};

const sagaMiddleware = createSagaMiddleware();

const persisedtReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'prodiction' && logger, sagaMiddleware].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persisedtReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);