import { create } from 'zustand'
import { UserProps } from '@models/user'

const useUserStore = create<{
    user: UserProps | null
    setUser: (state: UserProps | null) => void
}>((set) => ({
    user: null,
    setUser: (state) => set({ user: state }),
}))

export default useUserStore
