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
        // 에러를 상위로 전달
        if (axios.isAxiosError(e)) {
            console.error('Axios 에러:', e.response?.data || e.message)
        } else {
            console.error('미확인 error:', e)
        }
        throw e
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
            'http://ptday412-alb-1374488828.ap-northeast-2.elb.amazonaws.com/api/diaries/',
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
        // 에러를 상위로 전달
        if (axios.isAxiosError(e)) {
            console.error('Axios 에러:', e.response?.data || e.message)
        } else {
            console.error('미확인 error:', e)
        }
        throw e
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
