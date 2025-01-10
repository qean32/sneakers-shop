import { create } from "zustand";
import { Api } from "../../services/api-client";
import { CartStateItem, getCartDetails } from "@/lib/get-cart-details";
import { CreateCartItemValue } from "../../services/dto/cart-dto";

export const useCartStore = create<{
    totalAmount: number
    CartItem: CartStateItem[]
    error: boolean
    loading: boolean
    fetchCartItem: () => any,
    updateCartItem: (id: number, count: number) => Promise<void>;
    createCartItem: (values: CreateCartItemValue) => Promise<void>;
    removeCartItem: (id: number) => Promise<void>;
}>()((set, get) => ({
    totalAmount: 0,
    CartItem: [],
    error: false,
    loading: false,

    fetchCartItem: async () => {
        try {
            set({ loading: true, error: false });
            let data = await Api.cart.getCarts();
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    updateCartItem: async (id: number, count: number) => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.updateCart(id, count)
            set(getCartDetails(data))
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    removeCartItem: async (id: number) => {
        try {
            set((state) => ({
                loading: true,
                error: false,
                CartItem: state.CartItem.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
            }))
            const data = await Api.cart.removeCart(id)
            set(getCartDetails(data))
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    createCartItem: async (value: CreateCartItemValue) => {
        try {
            set({ loading: true, error: false })
            const data = await Api.cart.createCart(value)
            set(getCartDetails(data))
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    }
}))