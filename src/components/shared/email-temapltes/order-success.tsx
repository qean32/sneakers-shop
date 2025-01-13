import React from 'react';
import { CartItemDto } from '../../../../services/dto/cart-dto';

interface Props {
  orderId: number;
  items: CartItemDto[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Спасибо за покупку! 🎉</h1>

    <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>

    <hr />

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.SneakersItem.Sneakers.name} | {item.SneakersItem.price} ₽ x {item.count} шт. ={' '}
          {item.SneakersItem.price * item.count} ₽
        </li>
      ))}
    </ul>
  </div>
);
