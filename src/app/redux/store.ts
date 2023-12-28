import { wrapStore } from '@eduardoac-skimlinks/webext-redux';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { localStorage } from 'redux-persist-webextension-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'reduxjs-toolkit-persist';
import { WebStorage } from 'reduxjs-toolkit-persist/lib/types';
import lockReducer from "./slices/lockSlice";
import passkeysReducer from "./slices/passkeysSlice";
import passwordReducer from "./slices/passwordSlice";
import settingsReducer from "./slices/settingsSlice";

const persistConfig = {
  key: 'root',
  storage: localStorage as WebStorage,
  whitelist: ['password', 'settings', 'passkeys'],
};

const reducers = combineReducers({
  password: passwordReducer,
  lock: lockReducer,
  settings: settingsReducer,
  passkeys: passkeysReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

wrapStore(store);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
