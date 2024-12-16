import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
    className?: string
}

const categories: string[] = ['Nike', 'Adidas', 'New Balance', 'Other']
const activeIndex = 2

export const Categories: React.FC<Props> = (className) => {
    return (
        <div className={cn('inline-flex gap-4 bg-grey-50 p-2 rounded-2xl', className)}>

            {
                categories.map((item, index) => (
                    <a className={cn(
                        'flex items-center font-bold h-11 rounded-2xl px-5 duration-300',
                        activeIndex == index && 'bg-white shadow-md shadow-gray-300 text-primary',
                    )} key={index}>
                        <button>{item}</button>
                    </a>
                ))
            }

        </div>
    )
}