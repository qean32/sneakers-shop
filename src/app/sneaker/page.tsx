import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
    className?: string
}


export default function (className: any) {
    return (
        <div className={cn('', className)}>
            zxc
        </div>
    )
}