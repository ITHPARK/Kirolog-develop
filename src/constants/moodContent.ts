type MoodTypes = 'type1' | 'type2' | 'type3' | 'type4'

interface MoodProps {
    title: string // 제목은 문자열 (예: '희', '노')
    subMood: string[] // subMood는 문자열 배열 (예: ['기쁨', '설렘'])
}

export const mood: Record<MoodTypes, MoodProps> = {
    type1: {
        title: '희',
        subMood: ['기쁨', '설렘', '뿌듯', '감동', '만족', '행복'],
    },
    type2: {
        title: '노',
        subMood: ['분노', '짜증', '억울', '불쾌', '좌절', '답답', '초조'],
    },
    type3: {
        title: '애',
        subMood: ['슬픔', '속상', '우울', '외로움', '후회', '무기력', '그리움'],
    },
    type4: {
        title: '락',
        subMood: ['즐거움', '따듯', '기대', '여유', '평온'],
    },
}
