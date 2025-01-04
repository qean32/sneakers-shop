'use client'

import { Material } from "@prisma/client"
import React from "react"
import { Api } from "../services/api-client"
import { useSet } from "react-use"

export const useFilterMaterials = () => {
    const [materials, setMaterials] = React.useState<Material[]>()

    const [selectedMaterials, { toggle }] = useSet(new Set<string>([]))

    React.useEffect(() => {
        Api.materials.get()
            .then((data) => setMaterials(data))
            .catch((error) => console.log(error))
    }, [])

    return { materials, selectedMaterials, toggle } as { materials: Material[], selectedMaterials: any, toggle: (id: string) => void }
}