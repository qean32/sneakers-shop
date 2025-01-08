'use client';

import { ChooseSneakersForm } from ".";
import { SneakersWithRelations } from "../../../@types/prisma";



interface Props {
    product: SneakersWithRelations;
    onSubmit?: VoidFunction;
}

export const SneakersForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
    // const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

    return (
        <ChooseSneakersForm
            imageUrl={product.image}
            name={product.name}
            ingredients={product.materials}
            items={product.SneakersItem}
            onSubmit={() => { }}
        />
    );
};