import { prisma } from "../../prisma/prisma-client";


export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    size?: string;
    color?: string;
    materials?: string;
    priceFrom?: string;
    priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 16000;

export const findSneakers = async (params: GetSearchParams) => {
    const sizes = params.size?.split(',').map(Number);
    const sneakersColor = params.color?.split(',').map(Number);
    const ingredientsIdArr = params.materials?.split(',').map(Number);

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    const categories = await prisma.brand.findMany({
        include: {
            sneakers: {
                orderBy: {
                    id: 'desc',
                },
                where: {
                    materials: ingredientsIdArr
                        ? {
                            some: {
                                id: {
                                    in: ingredientsIdArr,
                                },
                            },
                        }
                        : undefined,
                    SneakersItem: {
                        some: {
                            size: {
                                in: sizes,
                            },
                            price: {
                                gte: minPrice, // >=
                                lte: maxPrice, // <=
                            },
                        },
                    },
                },
                include: {
                    materials: true,
                    SneakersItem: {
                        where: {
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                        },
                        orderBy: {
                            price: 'asc',
                        },
                    },
                },
            },
        },
    });

    return categories;
};