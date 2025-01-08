export const mapSnekersSize = {
    41: '41',
    42: '42',
    43: '43',
    44: '44',
} as const;

export const mapSneakersColor = {
    'red': 'красные',
    'blue': 'голубые',
    'white': 'белые',
} as const;

export const SneakersSizes = Object.entries(mapSnekersSize).map(([value, name]) => ({
    name,
    value,
}));

export const SneakersColors = Object.entries(mapSneakersColor).map(([value, name]) => ({
    name,
    value,
}));

export type SneakersSize = keyof typeof mapSnekersSize;
export type SneakersColor = keyof typeof mapSneakersColor;