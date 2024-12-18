import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ProductCard: React.FC<{
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    ingredients: { name: string }[];
    className?: string;
}> = ({
    id,
    name,
    price,
    imageUrl,
    ingredients,
    className = 'duration-200',
}) => {
        return (
            <div className={cn(className, 'hover:-translate-y-2')}>
                <Link href={`/product/${id}`}>
                    <div className="flex justify-center rounded-lg h-[170px]">
                        <div className="w-[170px] h-[170px] rounded-md duration-200" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover" }}> </div>
                    </div>

                    <Title text={name} size="sm" className="mt-4 h-24" />

                    <p className="text-sm text-gray-400">
                        {ingredients.map((ingredient: any) => ingredient.name).join(', ')}
                    </p>

                    <div className="flex justify-between items-center mt-1 mb-2 gap-2">
                        <span className="text-[20px]">
                            <p className='font-bold pl-1'>{price} ₽</p>
                        </span>
                    </div>

                    <Button variant="secondary" className="text-base font-bold">
                        <Plus size={20} className="mr-1" />
                        Добавить
                    </Button>
                </Link>
            </div>
        );
    };