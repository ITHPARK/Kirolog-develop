import React, { useState, useEffect } from 'react'
import Topbar from '@shared/Topbar'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import styled from '@emotion/styled'
import Spacing from '@shared/Spacing'
import { useNavigate, useParams } from 'react-router-dom'
import { useDiaryStore } from '@store/useDiary'
import { DiaryProps } from '@models/diary'
import ArrowLeft from '@shared/ico/ArrowLeft'
import MoodIcon from '@components/diary/MoodIcon'

const DiaryDetail = () => {
    const [dayDiary, setDayDiary] = useState<DiaryProps>()
    const [date, setDate] = useState<string | null>()

    const { id } = useParams()

    const { diarys } = useDiaryStore()

    useEffect(() => {
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
                        <ImageArea></ImageArea>
                        <Spacing size={20} />
                    </>
                )}

                <Flex align="center">
                    <Text typography="t3" weight="bold" color="gray800">
                        행복함
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
