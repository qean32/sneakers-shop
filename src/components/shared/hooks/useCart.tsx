import { useCartStore } from '@/store/cart';
import React from 'react';
import { CreateCartItemValue } from '../../../../services/dto/cart-dto';
import { CartStateItem } from '@/lib/get-cart-details';

type ReturnProps = {
    totalAmount: number
    CartItem: CartStateItem[]
    error: boolean
    loading: boolean
    updateCartItem: (id: number, count: number) => Promise<void>;
    createCartItem: (values: CreateCartItemValue) => Promise<void>;
    removeCartItem: (id: number) => Promise<void>;
};

export const useCart = (): ReturnProps => {
    const cartState = useCartStore((state) => state);

    React.useEffect(() => {
        cartState.fetchCartItem();
    }, []);

    return cartState;
};