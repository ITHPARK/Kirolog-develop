import React, { useEffect } from 'react'
import { useAddDiaryData, useAddDiaryStep } from '@store/useAddDiary'

import SelectImage from '@components/diary/SelectImage'
import TagCategory from '@components/diary/TagCategory'
import useFormatDate from '@/hooks/useFormatDate'
import AddKeyword from '@components/diary/AddKeyword'
import DiaryResult from '@components/diary/DiaryResult'

const AddDiaryAi = () => {
    const formatData = useFormatDate()

    //zustand 전역 상태관리
    const { step } = useAddDiaryStep()
    const { diaryData, setDiaryData } = useAddDiaryData()

    //처음 일기 쓰기 진입할 때만 날짜 설정
    useEffect(() => {
        setDiaryData({ ...diaryData, date: formatData(new Date()) })
    }, [])

    useEffect(() => {
        console.log(diaryData)
    }, [diaryData])

    return (
        <div>
            {step === 1 && <TagCategory />}
            {step === 2 && <SelectImage />}
            {step === 3 && <AddKeyword />}
            {/* <AiDiaryCreateLoading></AiDiaryCreateLoading> */}
            <DiaryResult />
        </div>
    )
}

export default AddDiaryAi
