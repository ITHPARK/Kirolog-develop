import React, { useEffect } from 'react'
import { useAddDiaryData, useAddDiaryStep } from '@store/useAddDiary'

import AddKeyword from '@components/diary/AddKeyword'
import AiDiaryComplateLoading from '@components/diary/AiDiaryComplateLoading'
import AiDiaryCreateLoading from '@components/diary/AiDiaryCreateLoading'
import DiaryResult from '@components/diary/DiaryResult'
import DiaryTop from '@components/diary/DiaryTop'
import SelectImage from '@components/diary/SelectImage'
import TagCategory from '@components/diary/TagCategory'
import useFormatDate from '@/hooks/useFormatDate'

const AddDiaryMy = () => {
    //zustand 전역 상태관리
    const { step } = useAddDiaryStep()
    const { diaryData, setDiaryData } = useAddDiaryData()

    console.log(diaryData)

    //처음 일기 쓰기 진입할 때만 날짜 설정
    useEffect(() => {
        const today = new Date()

        const formatType = `${today.getMonth() + 1}월 ${today.getDate()}일`

        setDiaryData({ ...diaryData, date: formatType })
    }, [])

    useEffect(() => {
        console.log(diaryData)
    }, [diaryData])

    return (
        <div>
            <DiaryTop />
            {step === 1 && <TagCategory />}
            {step === 2 && <SelectImage skipButton={true} />}
            {step === 3 && <DiaryResult />}

            {/* <AiDiaryCreateLoading></AiDiaryCreateLoading>
            <AiDiaryComplateLoading></AiDiaryComplateLoading> */}
        </div>
    )
}

export default AddDiaryMy
