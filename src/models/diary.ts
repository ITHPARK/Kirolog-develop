export interface DiaryProps {
    id: number //1
    ymd: string //'2024-05-14T00:00:00Z'
    content: string
    moods: string
    hashtags: []
    images: any
}

export interface DiaryResponseProps {
    id: number //1
    ymd: string //'2024-05-14T00:00:00Z'
    content: string
    moods: string
    hashtags: []
    presignedUrl: any
}
