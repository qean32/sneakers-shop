import { CartDto, CartItemDto } from "../../services/dto/cart-dto";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    disabled?: boolean;
    color?: string | null;
    size?: number | null;
    materials: Array<{ name: string; price: number }>;
};

interface ReturnProps {
    CartItem: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartDto): ReturnProps => {
    const CartItems = data.CartItems.map((item: CartItemDto) => ({
        id: item.id,
        quantity: item.count,
        name: item.SneakersItem.Sneakers.name,
        imageUrl: item.SneakersItem.Sneakers.image,
        price: calcCartItemTotalPrice(item),
        size: item.SneakersItem.size,
        color: item.SneakersItem.color,
        disabled: false,
        materials: item.materials.map((materials) => ({
            name: materials.name,
            price: materials.price,
        })),
    })) as CartStateItem[];

    return {
        CartItem: CartItems,
        totalAmount: data.TotalAmount,
    };
};