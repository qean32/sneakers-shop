import { cn } from '@/lib/utils'
import React from 'react'
import { Container, SearchInput } from '.'
import { Button, Input } from '../ui/index'
import { ArrowRight, ShoppingCart, User } from 'lucide-react'

interface Props {
    className: string
}


export const Header: React.FC<Props> = ({ className }) => {
    return (
        <header className={cn('', className)}>
            <Container className="flex items-center justify-between py-6">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-2xl uppercase font-black">UNEXT</h1>
                        <p className="text-sm text-gray-400 leading-3">выше некуда</p>
                    </div>
                </div>

                <div className="mx-10 flex-1 max-w-6xl">
                    <SearchInput />
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" type="button" className="h-12"><User size={16} /> Войти</Button>
                    <Button className='group relative h-12'>
                        <b>520 $</b>
                        <span className='h-full w-[1px] bg-white/30 mx-3' />
                        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                            <ShoppingCart size={16} />
                            <b>3</b>
                        </div>
                        <ArrowRight
                            size={20}
                            className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                        />
                    </Button>
                </div>
            </Container>
        </header>
    )
}