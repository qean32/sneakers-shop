import { CartItemDto } from "../../services/dto/cart-dto";


export const calcCartItemTotalPrice = (item: CartItemDto): number => {
  const ingredientsPrice = item.materials.reduce((acc, ingredient) => acc + ingredient.price, 0);

  return (ingredientsPrice + item.SneakersItem.price) * item.count;
};
