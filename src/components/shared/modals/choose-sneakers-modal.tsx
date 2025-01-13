'use client';

import { useRouter } from "next/navigation";
import { SneakersWithRelations } from "../../../../@types/prisma";
import { DialogContent, Dialog, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ChooseSneakersForm } from "..";
import { useCartStore } from "@/store";
import toast from "react-hot-toast";
import { sneakers } from "../../../../prisma/data";


interface Props {
    product: SneakersWithRelations;
    className?: string;
}

export const ChooseSneakersModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();
    const create = useCartStore()
    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId;

            if (itemId && ingredients) {
                await create.createCartItem({
                    sneakersId: itemId,
                    materials: ingredients,
                });
            }

            toast.success(product.name + ' добавлена в корзину');

        } catch (err) {
            toast.error('Не удалось добавить товар в корзину');
            console.error(err);
        }
    };

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className,
                )}>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>

                <ChooseSneakersForm
                    imageUrl={product.image}
                    name={product.name}
                    ingredients={product.materials}
                    items={product.SneakersItem}
                    onSubmit={onSubmit}
                />
            </DialogContent>
        </Dialog>
    );
};