import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ArrowLeft from '@shared/ico/ArrowLeft'
import { DiaryResponseProps } from '@models/diary'
import Flex from '@shared/Flex'
import MoodIcon from '@components/diary/MoodIcon'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import Topbar from '@shared/Topbar'
import styled from '@emotion/styled'
import useDiaryData from '@hooks/useDiaryData'

const DiaryDetail = () => {
    const [dayDiary, setDayDiary] = useState<DiaryResponseProps>()
    const [date, setDate] = useState<string | null>()

    const { data: diaryData, isLoading } = useDiaryData()

    const { id } = useParams()

    useEffect(() => {
        if (diaryData != null) {
            //특정 일기만 가져온다.
            const diary = diaryData.find(
                (item: DiaryResponseProps) => item.id === Number(id),
            )

            setDayDiary(diary)
            // -를 기준으로 나누기
            const dateSet = diary?.ymd.split('-') as string[]
            let dateStr = ''
            if (dateSet) {
                dateStr = `${dateSet[0]}.${dateSet[1]}.${dateSet[2]} `
                setDate(dateStr)
            }
        }
    }, [diaryData, id, dayDiary])

    const navigate = useNavigate()

    const handleClickBack = useCallback(() => {
        navigate(-1)
    }, [])

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
                {dayDiary?.presignedUrl && (
                    <>
                        <ImageArea src={dayDiary?.presignedUrl} />
                        <Spacing size={20} />
                    </>
                )}

                <Flex align="center">
                    <Text typography="t3" weight="bold" color="gray800">
                        {dayDiary?.moods}
                    </Text>
                    <Spacing size={4} direction="horizontal" />
                    <MoodIcon moodStr={dayDiary?.moods} />
                </Flex>
                <Spacing size={4} />
                <Text typography="t2" weight="regular" color="gray700">
                    {dayDiary?.content}
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
