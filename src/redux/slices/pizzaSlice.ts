import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store.ts";

import { SortItemType } from "../../components/Sort.tsx";

//type FetchPizzasArgs = Record<string, string>

export type SearchPizzaParams = {
    category: string,
    sortBy: string,
    order: string,
    search: string,
}
export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params:  SearchPizzaParams) => {
        const {category, sortBy, order, search,} = params;
        const { data } = await axios.get<Pizza[]>(
            `https://646ccf457b42c06c3b2c10c8.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}${search}`
        );
        return data;
    }
);

type Pizza = {
    id:string,
    title:string,
    price:number,
    imageUrl:string,
    sizes:number[],
    types:number[],
    count:number,
}

enum Status {
    LOADING = 'loading',
    SUCCESS= 'success',
    ERROR = 'error',
}

interface PizzaSliceState {
    items: Pizza[],
    status: 'loading' | 'success' | 'error',
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action){
            state.items = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder.addCase( fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase( fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase( fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },

    // extraReducers: {
    //     [fetchPizzas.pending]: (state) =>{
    //         state.status = 'loading';
    //         state.items = [];
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) =>{
    //         state.items = action.payload;
    //         state.status = 'success';
    //     },
    //     [fetchPizzas.rejected]: (state, action) =>{
    //         state.status = 'error';
    //         state.items = [];
    //     },
    // },
});

export const selectPizzaData = (state: RootState) => state.pizza;

// Action creators are generated for each case reducer function
export const { setItems} = pizzaSlice.actions;
export default pizzaSlice.reducer;