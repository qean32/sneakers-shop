'use client';

import React from 'react';
import { useIntersection } from 'react-use';

import { Title } from './title';
import { cn } from '@/lib/utils';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/store';

interface MaterialsInterface {
    name: string
    id: number
    price: number
    image: string
    sneakersId: number | null
}

interface SneakersItemInterface {
    id: number
    color: string | null
    size: number | null
    price: number
    SneakersId: number
}

interface SneakersInterface {
    id: number
    name: string
    image: string
    SneakersItem: SneakersItemInterface[]
    materials: MaterialsInterface[]
}

interface Props {
    title: string;
    items: SneakersInterface[],
    BrandId: number;
    className?: string;
    listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
    title,
    items,
    listClassName,
    BrandId,
    className,
}) => {
    const setCategoryId = useCategoryStore((state) => state.setCurrentId)
    const intersectionRef: any = React.useRef(null)
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4
    })

    React.useEffect(() => {
        intersection?.isIntersecting && setCategoryId(BrandId)
    }, [intersection?.isIntersecting, title, BrandId])

    return (
        <div className={cn(className, 'w-[900]')} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />

            <div className={cn('grid grid-cols-3 gap-2', listClassName)}>
                {items.map((sneakers) => (
                    <ProductCard
                        key={sneakers.id}
                        id={sneakers.id}
                        name={sneakers.name}
                        imageUrl={sneakers.image}
                        price={sneakers.SneakersItem[0] && sneakers.SneakersItem[0].price}
                        ingredients={sneakers.materials}
                    />
                ))}
            </div>
        </div>
    );
};