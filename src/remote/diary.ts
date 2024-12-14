import axios from 'axios'
import { addDiaryProps } from '@models/addDiary'

export const crateAiDiary = async (diaryDate: addDiaryProps) => {
    // const reqData = {
    //     "ymd":
    //     "2024-12-10"
    //     ,
    //     "content":
    //     "내용1"
    //     ,
    //     "moods":
    //     ”행복”
    //     ,
    //     "hashtags":
    //     ”#성수동, #블프”
    //     ,
    //     "images":

    //     }
    try {
        console.log(diaryDate.keyword)
        const hashtags = diaryDate.keyword?.map((item) => `#${item}`).join(',')

        console.log(hashtags)

        const reqData = {
            ymd: diaryDate.date,
            moods: diaryDate.moods,
            hashtags: hashtags,
            images: [diaryDate.image],
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
        // 에러를 상위로 전달
        if (axios.isAxiosError(e)) {
            console.error('Axios 에러:', e.response?.data || e.message)
        } else {
            console.error('미확인 error:', e)
        }
        throw e
    }
}
