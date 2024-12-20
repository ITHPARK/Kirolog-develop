import { useAddDiaryData, useAddDiaryStep } from '@store/useAddDiary'

import AddKeyword from '@components/diary/AddKeyword'
import AiDiaryComplateLoading from '@/components/diary/DiaryComplateLoading'
import AiDiaryCreateLoading from '@components/diary/AiDiaryCreateLoading'
import DiaryResult from '@components/diary/DiaryResult'
import DiaryTop from '@components/diary/DiaryTop'
import SelectImage from '@components/diary/SelectImage'
import TagCategory from '@components/diary/TagCategory'
import { useEffect } from 'react'
import useFormatDate from '@/hooks/useFormatDate'

const AddDiaryAi = () => {
    //zustand 전역 상태관리
    const { step } = useAddDiaryStep()
    const { diaryData, setDiaryData } = useAddDiaryData()
    const formatDate = useFormatDate()

    //처음 일기 쓰기 진입할 때만 날짜 설정
    useEffect(() => {
        const today = new Date()
        const dayNames = ['일', '월', '화', '수', '목', '금', '토']
        const dayOfWeek = today.getDay()
        const dayName = dayNames[dayOfWeek]

        const formatType = `${today.getMonth() + 1}월 ${today.getDate()}일 ${dayName}`

        setDiaryData({
            ...diaryData,
            date: formatDate(today),
            headDate: formatType,
        })
    }, [])

    useEffect(() => {
        console.log(diaryData)
    }, [diaryData])

    return (
        <div>
            <DiaryTop />
            {step === 1 && <TagCategory />}
            {step === 2 && <SelectImage />}
            {step === 3 && <AddKeyword />}
            {step === 4 && <DiaryResult />}
            {/* <AiDiaryCreateLoading></AiDiaryCreateLoading>
            <AiDiaryComplateLoading></AiDiaryComplateLoading> */}
        </div>
    )
}

export default AddDiaryAi
