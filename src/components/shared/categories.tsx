'use client'

import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store'
import React from 'react'

interface Props {
    className?: string
}
const categories: { id: number, name: string }[] = [
    { id: 1, name: 'Nike' },
    { id: 2, name: 'Adidas' },
    { id: 3, name: 'New Balance' },
    { id: 4, name: 'Other' }
];

export const Categories: React.FC<Props> = (className) => {
    const currentId = useCategoryStore((state) => state.currentId)


    return (
        <div className={cn('inline-flex gap-4 bg-grey-50 p-2 rounded-2xl', className)}>
            {
                categories.map(({ name, id }) => (
                    <a className={cn(
                        'flex items-center font-bold h-11 rounded-xl px-5 duration-300',
                        currentId == id && 'bg-white shadow-sm shadow-gray-200 text-primary',
                    )}
                        key={id}
                        href={`/#${name}`}
                    >
                        <button>{name}</button>
                    </a>
                ))
            }

        </div>
    )
}