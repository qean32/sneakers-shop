import { brands, materials, sneakers } from "./data"
import { prisma } from "./prisma-client"

const RndPrice = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const generateSneakersItem = ({
    SneakersId,
    size,
    color,
}: {
    SneakersId: number,
    size?: number,
    color?: string
}) => {
    return {
        SneakersId,
        price: RndPrice(20, 140),
        size,
        color
    }
}

const create = async () => {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User Test',
                email: 'user@test.ru',
                // password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin Admin',
                email: 'admin@test.ru',
                // password: hashSync('111111', 10),
                verified: new Date(),
                role: 'ADMIN',
            },
        ]
    })

    await prisma.materials.createMany({
        data: materials,
    });

    await prisma.brands.createMany({
        data: brands,
    });

    await prisma.sneakers.createMany({
        data: sneakers,
    });

    const sneakers1 = await prisma.sneakers.create({
        data: {
            name: "Nike Dunk Low Retro",
            brand: 1,
            image: "https://static.street-beat.ru/upload/resize_cache/iblock/492/500_500_1/vq30ykohy9shilbicqj8uzjy53k505yw.jpg",
        }
    })

    const sneakers2 = await prisma.sneakers.create({
        data: {
            brand: 1,
            name: "Nike Giannis Immortality 4",
            image: "https://static.street-beat.ru/upload/resize_cache/iblock/088/500_500_1/u17rsinz3o3uifbodlz93ys40kej5x3t.jpg",
        }
    })

    const sneakers3 = await prisma.sneakers.create({
        data: {
            brand: 1,
            image: "https://static.street-beat.ru/upload/resize_cache/iblock/c12/500_500_1/xltxybzr3fes4lrjh6ciy3hx9wilax4c.JPG",
            name: "Nike Court Borough Mid 2",
        }
    })

    await prisma.SneakersItem.createMany({
        data: [
            generateSneakersItem({ SneakersId: sneakers1.id, size: 42, color: 'red' }),
            generateSneakersItem({ SneakersId: sneakers1.id, size: 41, color: 'red' }),
            generateSneakersItem({ SneakersId: sneakers1.id, size: 43, color: 'red' }),
            generateSneakersItem({ SneakersId: sneakers1.id, size: 44, color: 'red' }),


            generateSneakersItem({ SneakersId: sneakers2.id, size: 42, color: 'white' }),
            generateSneakersItem({ SneakersId: sneakers2.id, size: 41, color: 'white' }),
            generateSneakersItem({ SneakersId: sneakers2.id, size: 43, color: 'white' }),
            generateSneakersItem({ SneakersId: sneakers2.id, size: 44, color: 'white' }),


            generateSneakersItem({ SneakersId: sneakers3.id, size: 42, color: 'blue' }),
            generateSneakersItem({ SneakersId: sneakers3.id, size: 41, color: 'blue' }),
            generateSneakersItem({ SneakersId: sneakers3.id, size: 43, color: 'blue' }),
            generateSneakersItem({ SneakersId: sneakers3.id, size: 44, color: 'blue' }),

            generateSneakersItem({ SneakersId: 1 }),
            generateSneakersItem({ SneakersId: 2 }),
            generateSneakersItem({ SneakersId: 3 }),
        ]
    })

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: '11111',
            },
            {
                userId: 2,
                totalAmount: 0,
                token: '222222',
            },
        ],
    });

    await prisma.cartItem.create({
        data: {
            sneakersItem: 1,
            cartId: 1,
            count: 2,
            materials: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
            },
        },
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}


async function main() {
    try {
        await down();
        await create();
    } catch (e) {
        console.error(e);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });