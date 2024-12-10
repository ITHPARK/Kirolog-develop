import { create } from 'zustand'

interface UserProps {
    name: string
    profilImage: string
}

const useUserStore = create<{
    user: UserProps | null
    setUser: (state: UserProps | null) => void
}>((set) => ({
    user: null,
    setUser: (state) => set({ user: state }),
}))

export default useUserStore
