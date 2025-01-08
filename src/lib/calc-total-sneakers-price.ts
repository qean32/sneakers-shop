import { SneakersColor, SneakersSize } from '@/components/shared/constants/sneakers';
import { Material, SneakersItem } from '@prisma/client';

/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 *
 * @returns number общую стоимость
 */
export const calcTotalSneakersPrice = (
    color: SneakersColor,
    size: SneakersSize,
    items: SneakersItem[],
    ingredients: Material[],
    selectedIngredients: Set<number>,
) => {
    const pizzaPrice =
        items.find((item) => item.color === color && item.size === size)?.price || 0;

    const totalIngredientsPrice = ingredients
        .filter((ingredient) => selectedIngredients.has(ingredient.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0);

    return pizzaPrice + totalIngredientsPrice;
};