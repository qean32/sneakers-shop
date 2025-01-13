import React from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutItem } from '../checkout-item';
import { CheckoutItemSkeleton } from '../checkout-item-skeleton';
import { CartStateItem } from '@/lib/get-cart-details';
import { getCartItemDetails } from '@/lib/get-cart-item-details';
import { SneakersColor, SneakersSize } from '../constants/sneakers';

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  loading,
  className,
}) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
          : items.map((item) => (
            <CheckoutItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              details={getCartItemDetails(
                item.materials,
                item.color as SneakersColor,
                item.size as SneakersSize,
              )}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              disabled={item.disabled}
              onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
              onClickRemove={() => removeCartItem(item.id)}
            />
          ))}
      </div>
    </WhiteBlock>
  );
};
