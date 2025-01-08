import { Material, SneakersItem } from '@prisma/client';
import { calcTotalSneakersPrice } from './calc-total-sneakers-price';
import { mapSneakersColor, SneakersColor, SneakersSize } from '@/components/shared/constants/sneakers';

export const getSneakersDetails = (
    color: SneakersColor,
    size: SneakersSize,
    items: SneakersItem[],
    ingredients: Material[],
    selectedIngredients: Set<number>,
) => {
    const totalPrice = calcTotalSneakersPrice(color, size, items, ingredients, selectedIngredients);
    const textDetaills = `${size} размер, ${mapSneakersColor[color]}`;

    return { totalPrice, textDetaills };
};