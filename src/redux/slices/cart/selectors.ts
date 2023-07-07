import {RootState} from "../../store.ts";

export const cartSelector = (state: RootState) => state.cart;
export const cartSelectorById = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id);
