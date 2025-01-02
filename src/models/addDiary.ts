export interface addDiaryProps {
    id?: number | null
    headDate?: string | null
    ymd: string | null
    moods: string
    image?: any
    content?: string
    keyword: string[]
}

export interface responseAddDiaryProps {
    id?: number
    ymd: string | null
    moods: string
    image?: File | null
    content?: string
    keyword: string
}

//s3 경로 요청 바디객체 타입
export interface ImageUploadProps {
    username: string
    date: string
    filename: string
}

export interface ImageUploadProps {
    username: string
    date: string
    filename: string
}
