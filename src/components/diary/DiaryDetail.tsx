import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ArrowLeft from '@shared/ico/ArrowLeft'
import { DiaryProps } from '@models/diary'
import Flex from '@shared/Flex'
import MoodIcon from '@components/diary/MoodIcon'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import Topbar from '@shared/Topbar'
import styled from '@emotion/styled'
import { useDiaryStore } from '@store/useDiary'

const DiaryDetail = () => {
    const [dayDiary, setDayDiary] = useState<DiaryProps>()
    const [date, setDate] = useState<string | null>()

    const { id } = useParams()

    const { diarys } = useDiaryStore()

    useEffect(() => {
        //특정 일기만 가져온다.
        const diaryData = diarys.find((item) => item.id === Number(id))

        setDayDiary(diaryData)
        // -를 기준으로 나누기
        const dateSet = diaryData?.ymd.split('-') as string[]

        let dateStr = ''
        if (dateSet) {
            dateStr = `${dateSet[0]}.${dateSet[1]}.${dateSet[2]} `
            setDate(dateStr)
        }
    }, [diarys, id])

    const navigate = useNavigate()

    const handleClickBack = () => {
        navigate(-1)
    }

    if (dayDiary == null) {
        return <div>로딩중</div>
    }

    return (
        <div>
            <Spacing size={30} />
            <Topbar
                title={`${date}`}
                left={<ArrowLeft />}
                leftOnClick={handleClickBack}
            />
            <Flex direction="column">
                {dayDiary?.images.length > 0 && (
                    <>
                        <ImageArea src={dayDiary?.images[0].presignedUrl} />
                        <Spacing size={20} />
                    </>
                )}

                <Flex align="center">
                    <Text typography="t3" weight="bold" color="gray800">
                        {dayDiary.moods}
                    </Text>
                    <Spacing size={4} direction="horizontal" />
                    <MoodIcon moodStr={dayDiary.moods} />
                </Flex>
                <Spacing size={4} />
                <Text typography="t2" weight="regular" color="gray700">
                    {dayDiary.content}
                </Text>
            </Flex>
        </div>
    )
}

const ImageArea = styled.img`
    widht: 100%;
    height: 335px;
    background: #ddd;
    border-radius: 8px;
`

export default DiaryDetail
