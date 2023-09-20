import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { noteAPI } from "./noteAPI";

// Automatically connects the app to Redux DevTools
// and adds `redux-thunk` middleware by default to handle asynchronous operations.
export const store = configureStore({
  reducer: {
    [noteAPI.reducerPath]: noteAPI.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([noteAPI.middleware]),
});

// To enable `refetchOnFocus` and `refetchOnReconnect` behaviors in the app,
// we passed the dispatch method available on the store to the `setupListeners()` function.
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
