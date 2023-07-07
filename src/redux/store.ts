import {configureStore} from "@reduxjs/toolkit";

import filter from './slices/filter/slice.ts';
import cart from './slices/cart/slice.ts';
import pizza from "./slices/pizza/slice.ts";
import {useDispatch} from "react-redux";
export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();