import { addDiaryProps } from '@models/addDiary'
import { create } from 'zustand'
import useFormatDate from '@hooks/useFormatDate'

export const useAddDiaryStep = create<{
    step: number
    setStep: (deltaOrValue: number, isAbsolute?: boolean) => void
}>((set) => ({
    step: 1, // 초기 값
    setStep: (deltaOrValue, isAbsolute = false) =>
        set((state) => ({
            step: isAbsolute ? deltaOrValue : state.step + deltaOrValue,
        })), // isAbsolute가 true이면 값을 설정, false이면 증가/감소
}))

export const useAddDiaryData = create<{
    diaryData: addDiaryProps
    setDiaryData: (diaryData: addDiaryProps) => void
}>((set) => ({
    diaryData: {
        date: null,
        mood: '',
        image: null,
        content: '',
        keyword: [],
    },
    setDiaryData: (diaryData: addDiaryProps) => set({ diaryData }), // 함수 표현식 수정
}))
