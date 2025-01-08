import { Material, Sneakers, SneakersItem } from '@prisma/client';

export type SneakersWithRelations = Sneakers & { SneakersItem: SneakersItem[]; materials: Material[] };