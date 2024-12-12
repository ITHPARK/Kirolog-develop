import { addDiaryProps } from '@models/addDiary'
import { create } from 'zustand'
import useFormatDate from '@hooks/useFormatDate'

export const useAddDiaryStep = create<{
    step: number
    setStep: (delta: number) => void
}>((set) => ({
    step: 1, // 초기 값
    setStep: (delta: number) => set((state) => ({ step: state.step + delta })), // delta에 따라 step을 증가 또는 감소
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
