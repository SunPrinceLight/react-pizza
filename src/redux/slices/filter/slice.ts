import {createSlice, PayloadAction} from '@reduxjs/toolkit'

//types
import {FilterSliceState, SortPropertyEnum ,SortItemType} from "./types.ts";

//stock constants
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

// Action creators are generated for each case reducer function
export const { setActiveCategory, setSort, setFilters, setSearchValue} = filterSlice.actions;
export default filterSlice.reducer;