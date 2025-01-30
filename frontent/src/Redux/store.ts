import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage
import userReducer from './reducers/Usereducer';
import { PersistConfig } from 'redux-persist';

// Define persist configuration
const persistConfig: PersistConfig<any> = {
  key: 'root', // Key for the persisted storage
  storage,     // Use localStorage by default
  whitelist: ['user'], // Only persist the user slice of the state
  blacklist: [], // Do not persist any other parts of the state
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Create store with persisted reducers
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
});

export const persistor = persistStore(store); // Create a persistor to manage persistence
export type RootState = ReturnType<typeof store.getState>;

export default store;
