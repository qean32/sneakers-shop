import React from 'react';
import { Container } from './container';
import { Categories } from './categories';
import { SortPopUp } from './sort-popup';
import { cn } from '@/lib/utils';
import { SearchInput } from './search-input';

interface Props {
    className?: string;
}

export const TopBar: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('sticky top-0 bg-white py-5 z-10', className)}>
            <Container className="flex items-center justify-between ">
                <Categories />
                <SortPopUp />
            </Container>
        </div>
    );
};