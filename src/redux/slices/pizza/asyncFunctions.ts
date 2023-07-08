import {createAsyncThunk} from "@reduxjs/toolkit";
import {Pizza, SearchPizzaParams} from "./type.ts";
import axios from "axios";

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