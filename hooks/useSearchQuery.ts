import { useRouter } from "next/navigation"
import { FiltersInterface } from "./useFilters"
import qs from "qs"
import React from "react"

export const useSearhQuery = ({ prices, selectedMaterials, selectedSize, selectedType }: FiltersInterface) => {
    const router = useRouter()

    React.useEffect(() => {
        const filetrs = {
            ...prices,
            type: Array.from(selectedType),
            size: Array.from(selectedSize),
            materials: Array.from(selectedMaterials),
        }

        const query = qs.stringify(filetrs, { arrayFormat: 'comma' })

        router.push(`?${query}`, { scroll: false })
    }, [selectedSize, selectedType, prices, selectedMaterials, router])
}