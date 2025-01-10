import { prisma } from '../../prisma/prisma-client';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

export const updateCartTotalAmount = async (token: string) => {
    const userCart = await prisma.cart.findFirst({
        where: {
            UserId: 1,
        },
        include: {
            CartItems: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    SneakersItem: {
                        include: {
                            Sneakers: true,
                        },
                    },
                    materials: true,
                },
            },
        },
    });

    if (!userCart) {
        return;
    }

    const totalAmount = userCart.CartItems.reduce((acc, item) => {
        return acc + calcCartItemTotalPrice(item);
    }, 0);

    return await prisma.cart.update({
        where: {
            id: userCart.id,
        },
        data: {
            TotalAmount: totalAmount,
        },
        include: {
            CartItems: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    SneakersItem: {
                        include: {
                            Sneakers: true,
                        },
                    },
                    materials: true,
                },
            },
        },
    });
};