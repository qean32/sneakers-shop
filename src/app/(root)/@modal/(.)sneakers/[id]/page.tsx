import { notFound } from 'next/navigation';
import { prisma } from '../../../../../../prisma/prisma-client';
import { ChooseSneakersModal } from '@/components/shared/modalas/choose-sneakers-modal';

export default async function ({ params }: any) {
    const { id } = await params
    const product = await prisma.sneakers.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            materials: true,
            SneakersItem: true,
        },
    });

    if (!product) {
        return notFound();
    }

    return <ChooseSneakersModal product={product} />
}