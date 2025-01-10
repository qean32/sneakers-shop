'use client';

import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { GroupVariants, SneakersImage, Title } from ".";
import { MaterialItem } from "./material-item";
import { Material, Sneakers, SneakersItem } from "@prisma/client";
import { useSneakersOptions } from "./hooks/useSneakersOptions";
import { getSneakersDetails } from "@/lib/get-sneakers-details";
import { SneakersColor, SneakersColors, SneakersSize } from "./constants/sneakers";


interface Props {
    imageUrl: string;
    name: string;
    ingredients: Material[];
    items: SneakersItem[];
    loading?: boolean;
    onSubmit: (itemId: number, ingredients: number[]) => void;
    className?: string;
}


export const ChooseSneakersForm: React.FC<Props> = ({
    name,
    items,
    imageUrl,
    ingredients,
    loading,
    onSubmit,
    className,
}) => {

    const {
        size,
        color,
        selectedIngredients,
        availableSizes,
        currentItemId,
        setSize,
        setColor,
        addIngredient,
    } = useSneakersOptions(items);

    const { totalPrice, textDetaills } = getSneakersDetails(
        color,
        size,
        items,
        ingredients,
        selectedIngredients,
    );

    const handleClickAdd = () => {
        console.log(currentItemId)
        if (currentItemId) {
            onSubmit(currentItemId, Array.from(selectedIngredients));
        }
    };

    return (
        <div className={cn(className, 'flex flex-1')}>
            <SneakersImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} />
                <p className="text-gray-400">{textDetaills}</p>

                <div className="flex flex-col gap-4 mt-5">
                    <GroupVariants
                        items={availableSizes}
                        value={String(size)}
                        onClick={(value) => setSize(Number(value) as SneakersSize)}
                    />

                    <GroupVariants
                        items={SneakersColors}
                        value={String(color)}
                        onClick={(value) => setColor(value as SneakersColor)}
                    />
                </div>

                <div className="border bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5 flex justify-center items-start">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map((ingredient) => (
                            <MaterialItem
                                key={ingredient.id}
                                name={ingredient.name}
                                price={ingredient.price}
                                imageUrl={ingredient.image}
                                onClick={() => addIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <div onClick={handleClickAdd}>
                    <Button
                        className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                        Добавить в корзину за {totalPrice}₽
                    </Button>
                </div>
            </div>
        </div>
    );
};