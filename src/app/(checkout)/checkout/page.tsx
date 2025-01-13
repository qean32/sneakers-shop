'use client';

import React from "react";
import { Container } from "@/components/shared/container";
import { CheckoutSidebar } from "@/components/shared/checkout-sidebar";
import { CheckoutCart, CheckoutPersonalForm, CheckoutAddressForm } from "@/components/shared/checkout";
import { FormProvider, useForm } from "react-hook-form";
import { Title } from "@/components/shared";
import { useCart } from "@/components/shared/hooks/useCart";
import { zodResolver } from '@hookform/resolvers/zod';
import toast from "react-hot-toast";
import { Api } from "../../../../services/api-client";
import { checkoutFormSchema, CheckoutFormValues } from "@/components/shared/constants/checkout-form-schema";
import { createOrder } from "@/app/actions";


export default function CheckoutPage() {

    const [submitting, setSubmitting] = React.useState(false);
    const { totalAmount, updateCartItem, CartItem, removeCartItem, loading } = useCart();
    // const { data: session } = useSession();

    const form = useForm<any>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: 'asdads',
            comment: '',
        },
    });

    // React.useEffect(() => {
    //     async function fetchUserInfo() {
    //         const data = await Api.auth.getMe();
    //         const [firstName, lastName] = data.fullName.split(' ');

    //         form.setValue('firstName', firstName);
    //         form.setValue('lastName', lastName);
    //         form.setValue('email', data.email);
    //     }

    //     if (session) {
    //         fetchUserInfo();
    //     }
    // }, [session]);

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true);

            const url = await createOrder(data);

            toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
                icon: '✅',
            });

            // if (url) {
            //     location.href = url;
            // }
        } catch (err) {
            console.log(err);
            setSubmitting(false);
            toast.error('Не удалось создать заказ', {
                icon: '❌',
            });
        }
    };

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateCartItem(id, newQuantity);
    };


    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

            <FormProvider {...form}>
                <form action={() => onSubmit(form.getValues())}>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                items={CartItem}
                                loading={loading}
                            />
                            <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
                            <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
                        </div>

                        <div className="w-[450px]">
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}
