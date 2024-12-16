import { DiaryProps } from '@models/diary'
import { create } from 'zustand'

export const useDiaryStore = create<{
    diarys: DiaryProps[]
    setDiarys: (diaryData: DiaryProps[]) => void
}>((set) => ({
    diarys: [
        // {
        //     id: 1,
        //     ymd: '2024-05-14',
        //     content: '이 필드는 필수 항목입니다.',
        //     moods: '설렘',
        //     hashtags: [],
        //     images: [],
        // },
    ],
    setDiarys: (diarys: DiaryProps[]) => set({ diarys }), // 함수 표현식 수정
}))
