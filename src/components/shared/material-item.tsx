import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import React from 'react';

interface Props {
    imageUrl: string;
    name: string;
    price: number;
    active?: boolean;
    onClick?: () => void;
    className?: string;
}

export const MaterialItem: React.FC<Props> = ({
    className,
    active,
    price,
    name,
    imageUrl,
    onClick,
}) => {
    return (
        <div
            className={cn(
                'flex items-center flex-col p-1 rounded-md w-28 text-center relative cursor-pointer shadow-sm bg-white',
                { 'border border-primary': active },
                className,
            )}
            onClick={onClick}>
            {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
            <img width={100} height={100} src={imageUrl} />
            <span className="text-xs mt-1">{name}</span>
            <span className="font-bold">{price} ₽</span>
        </div>
    );
};