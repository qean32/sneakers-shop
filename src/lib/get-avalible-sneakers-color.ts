import { SneakersSizes, SneakersColor } from "@/components/shared/constants/sneakers";
import { Variant } from "@/components/shared/group-variant";
import { SneakersItem } from "@prisma/client";

export const getAvailableSneakersSizes = (color: SneakersColor, items: SneakersItem[]): Variant[] => {
    const filteredSneakersByColor = items.filter((item) => item.color === color);

    return SneakersSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredSneakersByColor.some((sneakers) => Number(sneakers.size) === Number(item.name)),
    }));
};