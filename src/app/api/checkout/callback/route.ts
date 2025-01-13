import { OrderSuccessTemplate } from '@/components/shared/email-temapltes/order-success';
import { sendEmail } from '@/lib/send-email';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { PaymentCallbackData } from '../../../../../@types/yookassa';
import { prisma } from '../../../../../prisma/prisma-client';
import { CartItemDto } from '../../../../../services/dto/cart-dto';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    const isSucceeded = body.object.status === 'succeeded';

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCESED : OrderStatus.CENCELLED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDto[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        'UNEXT / Ваш заказ успешно оформлен 🎉',
        OrderSuccessTemplate({ orderId: order.id, items }),
      );
    } else {
      await sendEmail(
        order.email,
        'UNEXT / Ваш заказ не оплачен!',
        OrderSuccessTemplate({ orderId: order.id, items }),
      );
    }
  } catch (error) {
    console.log('[Checkout Callback] Error:', error);
    return NextResponse.json({ error: 'Server error' });
  }
}
