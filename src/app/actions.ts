'use server'

import { CheckoutFormValues } from "@/components/shared/constants/checkout-form-schema";
import { prisma } from "../../prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { PayOrderTemplate } from "@/components/shared/email-temapltes";
import { sendEmail } from "@/lib/send-email";
import { cookies } from "next/headers";
import { createPayment } from "@/lib/creat-payment";
import { VerificationUserTemplate } from "@/components/shared/email-temapltes/verification-user";
import { hashSync } from "bcrypt";
import { getUserSession } from "@/lib/get-user-session";

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

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            if (!user.verified) {
                throw new Error('Почта не подтверждена');
            }

            throw new Error('Пользователь уже существует');
        }

        const createdUser = await prisma.user.create({
            data: {
                fullname: body.fullname,
                email: body.email,
                password: hashSync(body.password, 10),
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: {
                code,
                UserId: createdUser.id,
            },
        });

        await sendEmail(
            createdUser.email,
            'UNEXT / 📝 Подтверждение регистрации',
            VerificationUserTemplate({
                code,
            }),
        );
    } catch (err) {
        console.log('Error [CREATE_USER]', err);
        throw err;
    }
}


export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error('Пользователь не найден');
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            },
        });

        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                fullname: body.fullname,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
            },
        });
    } catch (err) {
        console.log('Error [UPDATE_USER]', err);
        throw err;
    }
}