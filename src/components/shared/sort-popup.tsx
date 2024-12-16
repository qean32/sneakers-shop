import { cn } from '@/lib/utils'
import { ArrowUpDown } from 'lucide-react'
import React from 'react'

interface Props {
    className?: string
}


export const SortPopUp: React.FC<Props> = (className) => {
    return (
        <div className={cn('inline-flex items-center gap-3 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer', className)}>
            <span className='inline-flex items-center gap-1'>
                <ArrowUpDown size={16} />
                <b>Сортировка:</b>
            </span>
            <b className='text-primary'>Популярное</b>
        </div>
    )
}