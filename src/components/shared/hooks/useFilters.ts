import { useSearchParams } from "next/navigation"
import React from "react"
import { useSet } from "react-use"

interface priceInterface {
    priceFrom?: number
    priceTo?: number
}

export interface FiltersInterface {
    selectedSize: Set<string>
    selectedMaterials: Set<string>
    selectedType: Set<string>
    prices: priceInterface
}

export const useFilters = () => {
    const searchParams = useSearchParams()
    const clearAllFilter = () => {
        setPrice({ priceFrom: undefined, priceTo: undefined })
        clearSize()
        clearType()
        clearMaterials()
    }

    const [prices, setPrice] = React.useState<priceInterface>({
        priceFrom: searchParams.get('priceFrom') ? Number(searchParams.get('priceFrom')) : undefined,
        priceTo: searchParams.get('priceTo') ? Number(searchParams.get('priceTo')) : undefined,
    })

    const [selectedMaterials, { toggle: toggleMaterials, clear: clearMaterials }] = useSet(
        new Set<string>(searchParams.get('materials')?.split(','))
    )
    const [selectedType, { toggle: toggleSelectedType, clear: clearType }] = useSet(
        new Set<string>(searchParams.get('type') ? searchParams.get('type')?.split(',') : [])
    )
    const [selectedSize, { toggle: toggleSelectedSize, clear: clearSize }] = useSet(
        new Set<string>(searchParams.get('size') ? searchParams.get('size')?.split(',') : [])
    )

    const updatePrice = (price: keyof priceInterface, value: number) => {
        setPrice((prev) => ({
            ...prev,
            [price]: value,
        }));
    };

    return {
        clearAllFilter,
        selectedSize,
        selectedMaterials,
        selectedType,
        prices,
        setPrices: updatePrice,
        setType: toggleSelectedType,
        setSize: toggleSelectedSize,
        setMaterials: toggleMaterials,
    } as {
        setPrices: any,
        setType: any,
        setSize: any,
        setMaterials: any,
        clearAllFilter: () => void
    } & FiltersInterface
}