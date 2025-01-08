'use client'

import React from 'react';
import { Title } from './title';
import { Button, Input } from '../ui';
import { CheckboxFiltersGroup, RangeSlider } from '.';
import { Material } from '@prisma/client';
import { useFilters } from './hooks/useFilters';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useMaterials } from './hooks/useMatarials';
import { useSearhQuery } from './hooks/useSearchQuery';

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { materials } = useMaterials()
    const items = materials?.map((material: Material) => ({ text: material.name, value: String(material.id) }))

    const { clearAllFilter, prices, selectedMaterials, selectedSize, selectedType, setMaterials, setPrices, setSize, setType } = useFilters()
    useSearhQuery({ prices, selectedMaterials, selectedSize, selectedType })

    const updatePrices = (prices: number[]) => {
        setPrices('priceFrom', prices[0]);
        setPrices('priceTo', prices[1]);
    };

    return (
        <div className={className}>
            <div onClick={clearAllFilter}>
                <Button>Сброс</Button>
            </div>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

            <CheckboxFiltersGroup
                onClickCheckbox={setType}
                title="Тип обуви"
                name="types"
                className="mb-5"
                selected={selectedType}
                items={[
                    { text: 'Кроссовки', value: '1' },
                    { text: 'Кеды', value: '2' },
                ]}
            />

            <CheckboxFiltersGroup
                selected={selectedSize}
                onClickCheckbox={setSize}
                title="Размеры"
                name="sizes"
                className="mb-5"
                limit={3}
                items={[
                    { text: '42', value: '42' },
                    { text: '43', value: '43' },
                    { text: '44', value: '44' },
                    { text: '45', value: '45' },
                    { text: '46', value: '46' },
                    { text: '47', value: '47' },
                ]}
            />


            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={16000}
                        value={prices.priceFrom || 0}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrices('priceFrom', Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={16000}
                        placeholder="16000"
                        value={prices.priceTo || 16000}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrices('priceTo', Number(e.target.value))}
                    />
                </div>

                <RangeSlider
                    min={0}
                    max={16000}
                    step={400}
                    value={[prices.priceFrom || 0, prices.priceTo || 16000]}
                    onValueChange={updatePrices}
                />
            </div>

            {items &&
                <CheckboxFiltersGroup
                    title="Материалы"
                    name="materials"
                    className="mt-5"
                    limit={4} items={items}
                    selected={selectedMaterials}
                    onClickCheckbox={setMaterials}
                />
            }
        </div>
    );
};