import { Material } from "@prisma/client"
import { axiosInstance } from "./instance"

export const get = async () => {
    return (await axiosInstance.get<Material[]>('/materials')).data
}