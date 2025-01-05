import { Material } from "@prisma/client"
import React from "react"
import { Api } from "../services/api-client"

export const useMaterials = () => {
    const [materials, setMaterials] = React.useState<Material[]>()

    React.useEffect(() => {
        Api.materials.get()
            .then((data) => setMaterials(data))
            .catch((error) => console.log(error))
    }, [])

    return { materials } as { materials: Material[] }
}