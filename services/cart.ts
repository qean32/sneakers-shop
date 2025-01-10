import { CartDto, CreateCartItemValue } from "./dto/cart-dto"
import { axiosInstance } from "./instance"

export const getCarts = async () => {
    return ((await axiosInstance.get<CartDto>('/cart')).data)
}

export const removeCart = async (id: number) => {
    return (((await axiosInstance.delete<CartDto>('/cart/' + id,)).data))
}

export const updateCart = async (id: number, count: number) => {
    console.log(await axiosInstance.patch<CartDto>('/cart/' + id, { count }))
    return (((await axiosInstance.patch<CartDto>('/cart/' + id, { count })).data))
}

export const createCart = async (value: CreateCartItemValue) => {
    return (((await axiosInstance.post<CartDto>('/cart', value)).data))
}