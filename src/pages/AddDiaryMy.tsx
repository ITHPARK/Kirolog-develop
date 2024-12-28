import { useAddDiaryData, useAddDiaryStep } from '@store/useAddDiary'
import AiDiaryComplateLoading from '@/components/diary/DiaryComplateLoading'
import DiaryResult from '@components/diary/DiaryResult'
import DiaryTop from '@components/diary/DiaryTop'
import SelectImage from '@components/diary/SelectImage'
import TagCategory from '@components/diary/TagCategory'
import { useEffect } from 'react'
import useFormatDate from '@/hooks/useFormatDate'
import { useNavigate } from 'react-router-dom'

const AddDiaryMy = () => {
    //zustand 전역 상태관리
    const { step, setStep } = useAddDiaryStep()
    const { diaryData, setDiaryData } = useAddDiaryData()
    const formatDate = useFormatDate()
    const navigate = useNavigate()

    useEffect(() => {
        const today = new Date()
        const dayNames = ['일', '월', '화', '수', '목', '금', '토']
        const dayOfWeek = today.getDay()
        const dayName = dayNames[dayOfWeek]

        const formatType = `${today.getMonth() + 1}월 ${today.getDate()}일 ${dayName}`

        setDiaryData({
            ...diaryData,
            ymd: formatDate(today),
            headDate: formatType,
        })
    }, [])

    const handleClickComplate = () => {
        setDiaryData({
            headDate: null,
            ymd: null,
            moods: '',
            image: null,
            content: '',
            keyword: [],
        })
        setStep(1, true)
        navigate('/')
    }

    return (
        <div>
            <DiaryTop />
            {step === 1 && <TagCategory />}
            {step === 2 && <SelectImage skipButton={true} />}
            {step === 3 && <DiaryResult />}
            {step === 4 && (
                <AiDiaryComplateLoading onClick={handleClickComplate} />
            )}

            {/* <AiDiaryCreateLoading></AiDiaryCreateLoading> */}
        </div>
    )
}

export default AddDiaryMy
