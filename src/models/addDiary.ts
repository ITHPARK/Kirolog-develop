export interface addDiaryProps {
    headDate?: string | null
    date: string | null
    moods: string
    image?: any
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
