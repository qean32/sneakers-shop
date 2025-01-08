'use client';

import { useRouter } from "next/navigation";
import { SneakersWithRelations } from "../../../../@types/prisma";
import { DialogContent, Dialog, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ChooseSneakersForm } from "..";


interface Props {
    product: SneakersWithRelations;
    className?: string;
}

export const ChooseSneakersModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();

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
                    onSubmit={() => { }}
                />
            </DialogContent>
        </Dialog>
    );
};