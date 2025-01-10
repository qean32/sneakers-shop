'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { Container, SearchInput } from '.'
import Link from 'next/link'
import { CartButton } from './cart-button'

interface Props {
    className: string
}


export const Header: React.FC<Props> = ({ className }) => {
    return (
        <header className={cn('', className)}>
            <Container className="flex items-center justify-between py-6">
                <Link href='/'>
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-2xl uppercase font-black">UNEXT</h1>
                            <p className="text-sm text-gray-400 leading-3">выше некуда</p>
                        </div>
                    </div>
                </Link>

                <div className="mx-10 flex-1 max-w-6xl">
                    <SearchInput />
                </div>

                <CartButton />
            </Container>
        </header>
    )
}