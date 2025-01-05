type MoodTypes = "type1" | "type2" | "type3" | "type4"

interface MoodProps {
    title: string // 제목은 문자열 (예: '희', '노')
    subMood: string[] // subMood는 문자열 배열 (예: ['기쁨', '설렘'])
}

export const mood: Record<MoodTypes, MoodProps> = {
    type1: {
        title: "희",
        subMood: ["설렘", "뿌듯함", "감동", "만족감", "행복감"],
    },
    type2: {
        title: "노",
        subMood: [
            "분노",
            "짜증",
            "억울함",
            "불쾌함",
            "좌절",
            "답답함",
            "초조함",
        ],
    },
    type3: {
        title: "애",
        subMood: [
            "슬픔",
            "속상함",
            "우울함",
            "외로움",
            "후회",
            "무기력",
            "그리움",
        ],
    },
    type4: {
        title: "락",
        subMood: ["즐거움", "따듯함", "기대감", "여유로움", "평온함"],
    },
}
