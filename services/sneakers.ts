import { Sneakers } from "@prisma/client"
import { axiosInstance } from "./instance"
import { SNEAKERS_URL } from "./exports"

export const search = async (query: string) => {
    return (await axiosInstance.get<Sneakers[]>(SNEAKERS_URL, { params: { query } })).data
}