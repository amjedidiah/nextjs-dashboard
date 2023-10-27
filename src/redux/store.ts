import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSlice from "@/redux/slices/product.slice";
import configSlice from "@/redux/slices/config.slice";
import { createWrapper } from "next-redux-wrapper";
import { AppStore } from "@/types";

const rootReducer = combineReducers({
  [configSlice.name]: configSlice.reducer,
  [productSlice.name]: productSlice.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });

export const wrapper = createWrapper<AppStore>(makeStore);
