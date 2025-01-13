import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
import { CreateCartItemValue } from "../../../../services/dto/cart-dto";
import { findOrCreateCart } from "@/lib/find-or-create-cart";


export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    // if (!token) {
    //   return NextResponse.json({ totalAmount: 0, items: [] });
    // }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            UserId: 1,
          },
        ],
      },
      include: {
        CartItems: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            SneakersItem: {
              include: {
                Sneakers: true,
              },
            },
            materials: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValue;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        CartId: userCart.id,
        SneakersItemId: data.sneakersId,
        materials: {
          every: {
            id: { in: data.materials },
          },
        },
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          count: findCartItem.count + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          CartId: userCart.id,
          SneakersItemId: data.sneakersId,
          count: 1,
          materials: { connect: data.materials?.map((id) => ({ id })) },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set('cartToken', token);
    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
}
