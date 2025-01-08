import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    className?: string;
    imageUrl: string;
    size: 41 | 42 | 43 | 44;
}

export const SneakersImage: React.FC<Props> = ({ imageUrl, size, className }) => {
    return (
        <div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>
            <img
                src={imageUrl}
                alt="Logo"
                className={cn('relative -translate-y-44 transition-all z-10 duration-300', {
                    'w-[500px]': size === 41,
                    'w-[510px]': size === 42,
                    'w-[520px]': size === 43,
                    'w-[530px]': size === 44,
                })}
            />

            {/* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" /> */}
            {/* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" /> */}
        </div>
    );
};