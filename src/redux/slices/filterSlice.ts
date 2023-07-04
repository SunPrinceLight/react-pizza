import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store.ts";

import {SortPropertyEnum ,SortItemType} from "../../components/Sort.tsx";

interface FilterSliceState {
    searchValue: string,
    activeCategory: number,
    sort: SortItemType,
}

const initialState: FilterSliceState = {
    searchValue:"",
    activeCategory: 0,
    sort: {
        name: 'популярности (уб)',
        sortProperty: SortPropertyEnum.RATING_DESC,
    },
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>){
            state.searchValue = action.payload;
        },
        setActiveCategory(state, action: PayloadAction<number>){
            state.activeCategory = action.payload;
        },
        setSort(state, action: PayloadAction<SortItemType>){
            state.sort = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>){
            state.sort = action.payload.sort;
            state.activeCategory = Number(action.payload.activeCategory);
        },
    }

})

export const selectFilter = (state: RootState) => state.filter;

// Action creators are generated for each case reducer function
export const { setActiveCategory, setSort, setFilters, setSearchValue} = filterSlice.actions;
export default filterSlice.reducer;