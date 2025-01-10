import { CartItem, Material, SneakersItem, Cart, Sneakers } from "@prisma/client";

export type CartItemDto = CartItem & {
    materials: Material[]
    SneakersItem: SneakersItem & {
        Sneakers: Sneakers
    }
}

export interface CartDto extends Cart {
    CartItems: any;
    sneakersItems: CartItemDto[]
}

export interface CreateCartItemValue {
    sneakersId: number,
    materials: number[]
}