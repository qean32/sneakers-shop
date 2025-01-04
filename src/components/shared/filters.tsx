'use client'

import React from 'react';
import { Title } from './title';
import { Button, Input } from '../ui';
import { CheckboxFiltersGroup, RangeSlider } from '.';
import { useFilterMaterials } from '../../../hooks/useFilterMaterials';
import { Material } from '@prisma/client';
import { useSet } from 'react-use';
import qs from 'qs';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
    className?: string;
}

interface priceInterface {
    priceFrom?: number
    priceTo?: number
}

export const Filters: React.FC<Props> = ({ className }) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const { materials, selectedMaterials, toggle } = useFilterMaterials()
    const items = materials?.map((material: Material) => ({ text: material.name, value: String(material.id) }))

    const [prices, setPrice] = React.useState<priceInterface>({
        priceFrom: searchParams.get('priceFrom') ? Number(searchParams.get('priceFrom')) : undefined,
        priceTo: searchParams.get('priceTo') ? Number(searchParams.get('priceTo')) : undefined,
    })

    const [selectedType, { toggle: toggleSelectedType }] = useSet(new Set<string>(searchParams.get('type') ? searchParams.get('type')?.split(',') : []))
    const [selectedSize, { toggle: toggleSelectedSize }] = useSet(new Set<string>(searchParams.get('size') ? searchParams.get('size')?.split(',') : []))

    const updatePrice = (price: keyof priceInterface, value: number) => {
        setPrice({
            ...prices,
            [price]: value
        })
    }

    React.useEffect(() => {
        const filetrs = {
            ...prices,
            type: Array.from(selectedType),
            size: Array.from(selectedSize),
            materials: Array.from(selectedMaterials),
        }

        const query = qs.stringify(filetrs, { arrayFormat: 'comma' })

        router.push(`?${query}`)
    }, [selectedSize, selectedType, prices, selectedMaterials, router])

    return (
        <div className={className}>
            <div onClick={() => {
                setPrice({ priceFrom: undefined, priceTo: undefined })
            }}>
                <Button>Сброс</Button>
            </div>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

            <CheckboxFiltersGroup
                onClickCheckbox={toggleSelectedType}
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
                onClickCheckbox={toggleSelectedSize}
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePrice('priceFrom', Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={16000}
                        placeholder="16000"
                        value={prices.priceTo || 16000}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePrice('priceTo', Number(e.target.value))}
                    />
                </div>

                <RangeSlider
                    min={0}
                    max={16000}
                    step={400}
                    value={[prices.priceFrom || 0, prices.priceTo || 16000]}
                    onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
                />
            </div>

            {items &&
                <CheckboxFiltersGroup
                    title="Материалы"
                    name="materials"
                    className="mt-5"
                    limit={4} items={items}
                    onClickCheckbox={toggle}
                />}
        </div>
    );
};