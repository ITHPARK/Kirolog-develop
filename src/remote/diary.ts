import { ImageUploadProps, addDiaryProps } from "@models/addDiary"
import apiClient from "@utils/apiClient"
import axios from "axios"

import { getCookie } from "@utils/cookieController"

// AI 다이어리 생성 요청
export const crateAiDiary = async (diaryDate: addDiaryProps) => {
    const imgRequest: ImageUploadProps = {
        username: getCookie("username") || "",
        date: diaryDate.ymd || "",
        filename: diaryDate.image.name,
    }

    const s3imageUrl = await getS3ImageUrl(imgRequest)
    await putImageToS3(s3imageUrl, diaryDate)

    const hashtags = diaryDate.keyword?.map((item) => `${item}`).join(",")

    const diaryRequest = {
        ymd: diaryDate.ymd,
        moods: diaryDate.moods,
        hashtags: hashtags,
    }

    const response = await apiClient.post("/api/diaries/ai/", diaryRequest)
    return response.data
}

// 일반 다이어리 생성 요청
export const crateMyDiary = async (diaryDate: addDiaryProps) => {
    const reqData = {
        ymd: diaryDate.ymd,
        moods: diaryDate.moods,
        content: diaryDate.content,
        images: [diaryDate.image?.name || ""],
    }

    const response = await apiClient.post("/api/diaries/", reqData)
    return response.data
}

// 다이어리 조회
export const getDiary = async () => {
    const response = await apiClient.get("/api/diaries/")
    return response.data
}

//이미지를 올릴 S3의 저장소 url을 리턴받는 api
const getS3ImageUrl = async (reqBody: ImageUploadProps): Promise<string> => {
    try {
        const imageResponse = await axios.post(
            `${process.env.REACT_APP_S3_API_URL}`,
            reqBody,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        )

        return imageResponse.data.presignedUrl
    } catch (e) {
        if (axios.isAxiosError(e)) {
            alert("데이터를 요청하는중 에러가 발생하였습니다.")
        } else {
            // 기타 에러 처리
            alert("예상치 못한 오류가 발생했습니다.")
        }
        throw e
    }
}

// S3에 이미지 업로드
const putImageToS3 = async (imgUrl: string, diaryDate: addDiaryProps) => {
    return apiClient.put(imgUrl, diaryDate.image, {
        headers: { "Content-Type": diaryDate.image.type as string },
    })
}

export const deleteDiary = async (id: number) => {
    try {
        const response = await apiClient.delete(`/api/diaries/${id}/`, {
            headers: {
                Authorization: `Bearer ${getCookie("accessToken")}`,
            },
        })

        return response.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            alert("일기 삭제중 에러가 발생하였습니다.")
        } else {
            // 기타 에러 처리
            alert("예상치 못한 오류가 발생했습니다.")
        }
        throw e
    }
}

// 다이어리 수정
export const updateDiary = async (data: addDiaryProps) => {
    const request = {
        ymd: data.ymd,
        content: data.content,
        moods: data.moods,
    }

    const response = await apiClient.put(`/api/diaries/${data.id}/`, request)
    return response.data
}
