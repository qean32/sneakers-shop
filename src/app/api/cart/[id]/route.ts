import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma/prisma-client';
import { updateCartTotalAmount } from '@/lib/update-cart-total-amount';

export async function PATCH(req: NextRequest, { params }: any) {
  try {
    const params_ = await params
    const id = Number(params_.id);
    const data = (await req.json()) as { count: number };
    const token = req.cookies.get('cartToken')?.value;


    // if (!token) {
    //   return NextResponse.json({ error: 'Cart token not found' });
    // }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        count: data.count,
      },
    });


    console.log(cartItem)

    const updatedUserCart = await updateCartTotalAmount(token || '');

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_PATCH] Server error', error);
    return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const params_ = await params
    const id = Number(params_.id);
    const token = req.cookies.get('cartToken')?.value;

    // if (!token) {
    //   return NextResponse.json({ error: 'Cart token not found' });
    // }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.delete({
      where: {
        id: id,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token || '');

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_DELETE] Server error', error);
    return NextResponse.json({ message: 'Не удалось удалить корзину' }, { status: 500 });
  }
}
