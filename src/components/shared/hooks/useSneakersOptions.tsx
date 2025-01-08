import React from "react";
import { useSet } from "react-use";
import { SneakersSize, SneakersColor } from "../constants/sneakers";
import { Variant } from "../group-variant";
import { SneakersItem } from "@prisma/client";
import { getAvailableSneakersSizes } from "@/lib/get-avalible-sneakers-color";

interface ReturnProps {
    size: SneakersSize;
    color: SneakersColor;
    selectedIngredients: Set<number>;
    availableSizes: Variant[];
    currentItemId?: number;
    setSize: (size: SneakersSize) => void;
    setColor: (size: SneakersColor) => void;
    addIngredient: (id: number) => void;
}

export const useSneakersOptions = (items: SneakersItem[]): ReturnProps => {
    const [size, setSize] = React.useState<SneakersSize>(41);
    const [color, setColor] = React.useState<SneakersColor>('blue');
    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

    const availableSizes = getAvailableSneakersSizes(color, items);

    const currentItemId = items.find((item) => item.color === color && item.size === size)?.id;

    React.useEffect(() => {
        const isAvailableSize = availableSizes?.find(
            (item) => Number(item.value) === size && !item.disabled,
        );
        const availableSize = availableSizes?.find((item) => !item.disabled);

        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as SneakersSize);
        }
    }, [color]);

    return {
        size,
        color,
        selectedIngredients,
        availableSizes,
        currentItemId,
        setSize,
        setColor,
        addIngredient,
    };
};
