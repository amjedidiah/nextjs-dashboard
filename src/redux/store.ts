import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice from "@/redux/slices/product.slice";
import configSlice from "@/redux/slices/config.slice";
import { createWrapper } from "next-redux-wrapper";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";
import { AppStore } from "@/types";

const rootReducer = combineReducers({
  [configSlice.name]: configSlice.reducer,
  [productSlice.name]: productSlice.reducer,
});

export const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }).prepend(
        nextReduxCookieMiddleware({
          subtrees: [productSlice.name],
        })
      );
    },
  })
);

export const wrapper = createWrapper<AppStore>(makeStore);
