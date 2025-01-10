import { mapSneakersColor, SneakersColor, SneakersSize } from "@/components/shared/constants/sneakers";


export const getCartItemDetails = (
    materials: any[],
    color?: SneakersColor,
    size?: SneakersSize,
): string => {
    const details = [];

    if (size && color) {
        const typeName = mapSneakersColor[color];
        details.push(`${typeName} ${size}`);
    }

    if (materials) {
        details.push(...materials.map((ingredient) => ingredient.name));
    }

    return details.join(', ');
};