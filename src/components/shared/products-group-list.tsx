'use client';

import React from 'react';
import { useIntersection } from 'react-use';

import { Title } from './title';
import { cn } from '@/lib/utils';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/store';

interface Props {
    title: string;
    items: { id: number, name: string, imageUrl: string, items: { price: number }[], ingredients: { name: string }[] }[];
    categoryId: number;
    className?: string;
    listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
    title,
    items,
    listClassName,
    categoryId,
    className,
}) => {
    const setCategoryId = useCategoryStore((state) => state.setCurrentId)
    const intersectionRef: any = React.useRef(null)
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4
    })

    React.useEffect(() => {
        intersection?.isIntersecting && setCategoryId(categoryId)
    }, [intersection?.isIntersecting, title, categoryId])

    return (
        <div className={cn(className, 'w-[1050]')} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />

            <div className={cn('grid grid-cols-4 gap-2', listClassName)}>
                {items.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={product.items[0].price}
                        ingredients={product.ingredients}
                    />
                ))}
            </div>
        </div>
    );
};