import React from 'react';
import { Title } from './title';
import { Input } from '../ui';
import { CheckboxFiltersGroup, RangeSlider } from '.';

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {

    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

            <CheckboxFiltersGroup
                title="Тип обуви"
                name="pizzaTypes"
                className="mb-5"
                items={[
                    { text: 'Кроссовки', value: '1' },
                    { text: 'Кеды', value: '2' },
                ]}
            />

            <CheckboxFiltersGroup
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
                    />
                    <Input
                        type="number"
                        min={100}
                        max={16000}
                        placeholder="1000"
                    />
                </div>

                <RangeSlider
                    min={0}
                    max={16000}
                    step={400}
                />
            </div>

            <CheckboxFiltersGroup
                title="Материалы"
                name="ingredients"
                className="mt-5"
                limit={6} items={[]}
            />
        </div>
    );
};