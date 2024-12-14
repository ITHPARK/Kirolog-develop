export interface addDiaryProps {
    date: string | null
    moods: string
    image?: File | null
    content?: string
    keyword?: string[]
}

export interface responseAddDiaryProps {
    date: string | null
    moods: string
    image?: File | null
    content?: string
    keyword: string
}
