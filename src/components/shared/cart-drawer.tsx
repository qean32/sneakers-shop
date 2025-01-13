'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Dialog, DialogDescription, DialogTitle, Title } from '@radix-ui/react-dialog';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetFooter } from '../ui/sheet';
import { CartDrawerItem } from './cart-drawer-item';
import { SneakersColor, SneakersSize } from './constants/sneakers';
import { useCart } from './hooks/useCart';
import { getCartItemDetails } from '@/lib/get-cart-item-details';
import Link from 'next/link';


export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { totalAmount, updateCartItem, CartItem, removeCartItem } = useCart();

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateCartItem(id, newQuantity);
    };

    return (
        <Dialog>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
                    {totalAmount > 0 && (
                        <SheetHeader>
                            <SheetTitle>
                                В корзине <span className="font-bold">{CartItem.length} товара</span>
                            </SheetTitle>
                        </SheetHeader>
                    )}

                    {!totalAmount && (
                        <div className="flex flex-col items-center justify-center w-72 mx-auto">
                            <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
                            <Title title="Корзина пустая" className="text-center font-bold my-2" />
                            <p className="text-center text-neutral-500 mb-5">
                                Добавьте хотя бы одну пиццу, чтобы совершить заказ
                            </p>

                            <SheetClose>
                                <Button className="w-56 h-12 text-base" size="lg">
                                    <ArrowLeft className="w-5 mr-2" />
                                    Вернуться назад
                                </Button>
                            </SheetClose>
                        </div>
                    )}

                    {totalAmount > 0 && (
                        <>
                            <div className="-mx-6 mt-5 overflow-auto flex-1">
                                {CartItem.map((item) => (
                                    <div key={item.id} className="mb-2">
                                        <CartDrawerItem
                                            id={item.id}
                                            imageUrl={item.imageUrl}
                                            details={getCartItemDetails(
                                                item.materials,
                                                String(item.color) as SneakersColor,
                                                item.size as SneakersSize,
                                            )}
                                            disabled={item.disabled}
                                            name={item.name}
                                            price={item.price}
                                            quantity={item.quantity}
                                            onClickCountButton={(type) =>
                                                onClickCountButton(item.id, item.quantity, type)
                                            }
                                            onClickRemove={() => removeCartItem(item.id)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <SheetFooter className="-mx-6 bg-white p-8">
                                <div className="w-full">
                                    <div className="flex mb-4">
                                        <span className="flex flex-1 text-lg text-neutral-500">
                                            Итого
                                            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                        </span>

                                        <span className="font-bold text-lg">{totalAmount} ₽</span>
                                    </div>

                                    <SheetTrigger>
                                        <Link href="/checkout">
                                            <Button
                                                type="submit"
                                                className="w-full h-12 text-base">
                                                Оформить заказ
                                                <ArrowRight className="w-5 ml-2" />
                                            </Button>
                                        </Link>
                                    </SheetTrigger>
                                </div>
                            </SheetFooter>
                        </>
                    )}
                </div>
            </SheetContent>
        </Dialog>
    );
};
