'use client'

import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store'
import { Brand } from '@prisma/client'
import React from 'react'

interface Props {
    className?: string
    brands: Brand[]
}

export const Categories: React.FC<Props> = ({ className, brands }) => {
    const currentId = useCategoryStore((state) => state.currentId)


    return (
        <div className={cn('inline-flex gap-4 bg-grey-50 p-2 rounded-2xl', className)}>
            {
                brands.map(({ name, id }) => (
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