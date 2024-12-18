import { create } from 'zustand'


export const useCategoryStore = create<{
    currentId: number
    setCurrentId: (currentId: number) => void
}>()((set) => ({
    currentId: 1,
    setCurrentId: (currentId: number) => set({ currentId })
}))
