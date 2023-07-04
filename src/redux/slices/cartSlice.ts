import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store.ts";

//types
export type CartItem = {
    id:string,
    title:string,
    price:number,
    imageUrl:string,
    size:number,
    type:number,
    count:number,
}
interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
}
//constants
const initialState: CartSliceState = {
    totalPrice: 0,
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //addItem(state, action){
        //    state.items.push(action.payload);
        //    state.totalPrice = state.items.reduce((sum,obj) =>{
        //        return obj.price + sum;
        //    }, 0);
        //},
        addItem(state, action: PayloadAction<CartItem>){
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem){
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = state.items.reduce((sum,obj) =>{
                return obj.price*obj.count + sum;
            }, 0);
        },
        removeItem(state, action: PayloadAction<string>){
            state.items = state.items.filter(obj => obj.id !== action.payload);
            state.totalPrice = state.items.reduce((sum,obj) =>{
                return obj.price*obj.count + sum;
            }, 0);
        },
        minusItem(state, action: PayloadAction<string>){
            const findItem = state.items.find(obj => obj.id === action.payload)
            if(findItem){
                findItem.count--;
                state.totalPrice = state.items.reduce((sum,obj) =>{
                    return obj.price*obj.count + sum;
                }, 0);
            }
        },
        clearItems(state){
            state.items = [];
            state.totalPrice = 0;
        },

    }

})


export const cartSelector = (state: RootState) => state.cart;
export const cartSelectorById = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id);

// Action creators are generated for each case reducer function
export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;