import React from 'react';
import { Container } from './container';
import { Categories } from './categories';
import { SortPopUp } from './sort-popup';
import { cn } from '@/lib/utils';
import { Brand } from '@prisma/client';

interface Props {
    className?: string;
    brands: Brand[]
}

export const TopBar: React.FC<Props> = ({ className, brands }) => {
    return (
        <div className={cn('sticky top-0 bg-white py-5 z-10', className)}>
            <Container className="flex items-center justify-between ">
                <Categories brands={brands} />
                <SortPopUp />
            </Container>
        </div>
    );
};