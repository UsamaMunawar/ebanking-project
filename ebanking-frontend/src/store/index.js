import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import accountReducer from './features/account/accountSlice';
import { ebankingApi } from './features/apiSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    [ebankingApi.reducerPath]: ebankingApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ebankingApi.middleware),
});


setupListeners(store.dispatch);
