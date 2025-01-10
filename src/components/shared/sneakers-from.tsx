'use client'

import { ChooseSneakersForm } from ".";
import toast from 'react-hot-toast';
import { SneakersWithRelations } from "../../../@types/prisma";
import { useCartStore } from "@/store";

interface Props {
    sneakers: SneakersWithRelations
    onSubmit?: VoidFunction;
}

export const SneakersForm: React.FC<Props> = ({ sneakers, onSubmit: _onSubmit }) => {
    const create = useCartStore()
    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            console.log('add')
            const itemId = productItemId;

            if (itemId && ingredients) {
                await create.createCartItem({
                    sneakersId: itemId,
                    materials: ingredients,
                });
            }

            toast.success(sneakers.name + ' добавлена в корзину');

            _onSubmit?.();
        } catch (err) {
            toast.error('Не удалось добавить товар в корзину');
            console.error(err);
        }
    };
    return (
        <ChooseSneakersForm
            imageUrl={sneakers.image}
            name={sneakers.name}
            ingredients={sneakers.materials}
            items={sneakers.SneakersItem}
            onSubmit={onSubmit}
        />
    );
};