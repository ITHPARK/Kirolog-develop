import { addDiaryProps } from '@models/addDiary'
import axios from 'axios'

export const crateAiDiary = async (diaryDate: addDiaryProps) => {
    try {
        const hashtags = diaryDate.keyword?.map((item) => `#${item}`).join(',')

        const reqData = {
            ymd: diaryDate.date,
            moods: diaryDate.moods,
            hashtags: hashtags,
            images: [diaryDate.image?.name || ''],
        }

        console.log(reqData)

        const response = await axios.post(
            'http://ptday412-alb-1374488828.ap-northeast-2.elb.amazonaws.com/api/diaries/ai/',
            reqData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            },
        )

        return response.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            alert('데이터를 요청하는중 에러가 발생하였습니다.')
        } else {
            // 기타 에러 처리
            alert('예상치 못한 오류가 발생했습니다.')
            console.error(e)
        }
    }
}

export const crateMyDiary = async (diaryDate: addDiaryProps) => {
    try {
        const reqData = {
            ymd: diaryDate.date,
            moods: diaryDate.moods,
            content: diaryDate.content,
            images: [diaryDate.image?.name || ''],
        }

        const response = await axios.post(
            'https://www.kirolog.com/api/diaries/',
            reqData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            },
        )

        return response.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            alert('데이터를 요청하는중 에러가 발생하였습니다.')
        } else {
            // 기타 에러 처리
            alert('예상치 못한 오류가 발생했습니다.')
            console.error(e)
        }
    }
}

export const getDiary = async () => {
    const response = await axios.get(
        'http://ptday412-alb-1374488828.ap-northeast-2.elb.amazonaws.com/api/diaries/',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    )

    return response.data
}
