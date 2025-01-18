'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { Container, SearchInput } from '.'
import Link from 'next/link'
import { CartButton } from './cart-button'
import { AuthModal } from './modals/auth-modal'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { ProfileButton } from './profile-button'

interface Props {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;
}


export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
    const router = useRouter();
    const [openAuthModal, setOpenAuthModal] = React.useState(false);

    const searchParams = useSearchParams();

    React.useEffect(() => {
        let toastMessage = '';

        if (searchParams.has('paid')) {
            toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
        }

        if (searchParams.has('verified')) {
            toastMessage = 'Почта успешно подтверждена!';
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace('/');
                toast.success(toastMessage, {
                    duration: 3000,
                });
            }, 1000);
        }
    }, []);

    return (
        <header className={cn('', className)}>
            <Container className="flex items-center justify-between py-6 ">
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

                <div className="flex items-center gap-3">
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

                    {hasCart && <CartButton />}
                </div>
            </Container>
        </header>
    )
}