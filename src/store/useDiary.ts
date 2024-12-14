import { DiaryProps } from '@models/diary'
import { create } from 'zustand'

export const useDiaryStore = create<{
    diarys: DiaryProps[]
    setDiarys: (diaryData: DiaryProps[]) => void
}>((set) => ({
    diarys: [
        {
            id: 1,
            ymd: '2024-05-14',
            content: '이 필드는 필수 항목입니다.',
            moods: '설렘',
            hashtags: [],
            images: [],
        },
        {
            id: 2,
            ymd: '2024-05-14',
            content: '이 필드는 필수 항목입니다.',
            moods: '슬픔',
            hashtags: [],
            images: [],
        },
        {
            id: 3,
            ymd: '2024-06-14',
            content: '이 필드는 필수 항목입니다.',
            moods: '외로움',
            hashtags: [],
            images: [],
        },
        {
            id: 4,
            ymd: '2024-12-12',
            content: '이 필드는 필수 항목입니다.',
            moods: '짜증',
            hashtags: [],
            images: [],
        },
        {
            id: 5,
            ymd: '2024-12-14',
            content: '이 필드는 필수 항목입니다.',
            moods: '즐거움',
            hashtags: [],
            images: [],
        },
    ],
    setDiarys: (diarys: DiaryProps[]) => set({ diarys }), // 함수 표현식 수정
}))
