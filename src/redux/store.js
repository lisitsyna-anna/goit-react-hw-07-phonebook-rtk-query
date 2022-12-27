import { setupListeners } from '@reduxjs/toolkit/query';
import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './constactsSlice';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});

setupListeners(store.dispatch);
