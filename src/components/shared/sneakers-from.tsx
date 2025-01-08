'use client'

import { ChooseSneakersForm } from ".";
import { SneakersWithRelations } from "../../../@types/prisma";

interface Props {
    sneakers: SneakersWithRelations
    onSubmit?: VoidFunction;
}

export const SneakersForm: React.FC<Props> = ({ sneakers, onSubmit: _onSubmit }) => {
    return (
        <ChooseSneakersForm
            imageUrl={sneakers.image}
            name={sneakers.name}
            ingredients={sneakers.materials}
            items={sneakers.SneakersItem}
            onSubmit={() => { }}
        />
    );

    // return (
    //     <ChooseProductForm
    //         imageUrl={sneakers.image}
    //         name={sneakers.name}
    //         price={firstItem.price}
    //     />
    // );
};