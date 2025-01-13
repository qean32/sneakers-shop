'use server'

import { CheckoutFormValues } from "@/components/shared/constants/checkout-form-schema";
import { prisma } from "../../prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { PayOrderTemplate } from "@/components/shared/email-temapltes";
import { sendEmail } from "@/lib/send-email";
import { cookies } from "next/headers";
import { createPayment } from "@/lib/creat-payment";

export async function createOrder(data: any) {
    try {
        // const cookieStore = cookies();
        // const cartToken = cookieStore.get('cartToken')?.value;

        // if (!cartToken) {
        //     throw new Error('Cart token not found');
        // }

        const userCart = await prisma.cart.findFirst({
            include: {
                User: true,
                CartItems: {
                    include: {
                        materials: true,
                        SneakersItem: {
                            include: {
                                Sneakers: true,
                            },
                        },
                    },
                },
            },
            where: {
                UserId: 1
            },
        });

        if (!userCart) {
            throw new Error('Cart not found');
        }

        if (userCart?.TotalAmount === 0) {
            throw new Error('Cart is empty');
        }

        const order = await prisma.order.create({
            data: {
                token: 'cartToken',
                fullname: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                TotalAmount: userCart.TotalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.CartItems),
                UserId: 1
            },
        });

        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                TotalAmount: 0,
            },
        });

        await prisma.cartItem.deleteMany({
            where: {
                CartId: userCart.id,
            },
        });

        const paymentData = await createPayment({
            amount: order.TotalAmount,
            orderId: order.id,
            description: 'Оплата заказа #' + order.id,
        });

        if (!paymentData) {
            throw new Error('Payment data not found');
        }

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id,
            },
        });

        const paymentUrl = paymentData.confirmation.confirmation_url

        await sendEmail(
            data.email,
            'UNEXT / Оплатите заказ #' + order.id,
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.TotalAmount,
                paymentUrl,
            }),
        );

        return paymentUrl;
    } catch (err) {
        console.log('[CreateOrder] Server error', err);
    }
}