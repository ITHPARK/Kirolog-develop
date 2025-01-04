import { create } from "zustand"

export const useCalendar = create<{
    tab: number
    viewDate: Date
    diaryDate: Date
    setTab: (mode: number) => void
    setViewDate: (date: Date) => void
    setDiaryDate: (date: Date) => void
}>((set) => ({
    tab: 1,
    viewDate: new Date(),
    diaryDate: new Date(),
    setTab: (mode: number) => set({ tab: mode }),
    setViewDate: (date: Date) => set({ viewDate: date }),
    setDiaryDate: (date: Date) => set({ diaryDate: date }),
}))
