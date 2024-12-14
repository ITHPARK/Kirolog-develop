import React, { useEffect, useState } from 'react'

import AddPopup from '@components/diary/AddPopup'
import Calendar from 'react-calendar'
import CalendarPicker from '@components/calendar/CalendarPicker'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import TabContainer from '@shared/TabContainer'
import Text from '@shared/Text'
import calendarStyles from '@styles/calendarStyles'
import { css } from '@emotion/react'
import moment from 'moment'
import styled from '@emotion/styled'
import { useDrawerContext } from '@/context/DrawContext'
import useFormatDate from '@hooks/useFormatDate'
import useFormatPickerDate from '@hooks/useFormatPickerDate'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getDiary } from '@remote/diary'
import { useDiaryStore } from '@store/useDiary'
import { DiaryProps } from '@models/diary'
import DayCircle from '@components/calendar/DayCircle'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const CalendarBox = () => {
    const { open } = useDrawerContext()
    const navigate = useNavigate()
    const { diarys, setDiarys } = useDiaryStore()
    const formatDate = useFormatDate()

    // 내가 선택한 날짜
    const [selectedDate, setSelectedDate] = useState<Value>(new Date())

    // 내가 선택한 날짜의 월
    const [currentMonth, setCurrentMonth] = useState<number | null>(
        new Date().getMonth() + 1,
    )

    const [pickerDate, setPickerDate] = useState<Date>(new Date())

    const { data, isLoading } = useQuery({
        queryKey: ['diary'],
        queryFn: () => getDiary(),
        retry: false,
    })

    useEffect(() => {
        //리액트 쿼리로 데이터를 받으면 전역에 저장
        if (data != null && data.length > 0) {
            //받은 모든 일기 리스트에서 ymd를 (2024=12-14)형식으로 바꾼다.
            const format = data.map((item: DiaryProps) => {
                const formatDate = item.ymd.split('T')[0]
                return { ...item, ymd: formatDate }
            })
            setDiarys(format)
        }
    }, [data])

    useEffect(() => {
        setCurrentMonth(pickerDate.getMonth() + 1)
    }, [pickerDate, currentMonth])

    // 날짜에 아이콘 추가
    const getTileContent = ({ date }: { date: Date }) => {
        const dateStr = formatDate(date)
        const today = formatDate(new Date())

        if (dateStr <= today) {
            const diary = diarys.find((item) => item.ymd === dateStr)

            //일기를 쓴 날에 추가
            if (diary) {
                return (
                    <DayCircle
                        moodStr={diary.moods}
                        onClick={() => navigate(`/diary/${diary.id}`)}
                    />
                )
            } else if (dateStr === today) {
                //오늘 아직 일기를 쓰지 않았다면 클릭했을 때 일기 추가 팝업뜬다.
                return <DayCircle today={true} onClick={handleClickAddDiary} />
            }
        }

        if (dateStr > today) {
            return <DayCircle />
        }
    }

    // 현재 월 표시
    const getTitleClass = ({ date, view }: { date: Date; view: string }) => {
        let classes = ''

        const a = new Date(pickerDate)
        a.setHours(0, 0, 0, 0)

        if (view === 'month') {
            const dayMonth = date.getMonth() + 1

            if (date > a) {
                classes += 'future-date '
            }

            if (currentMonth !== dayMonth) {
                classes += 'different-month '
            }
        }

        return classes
    }

    // 월 picker 클릭
    const handleClickPopup = () => {
        open({
            Component: CalendarPicker,
            componentProps: { setPickerDate: setPickerDate },
            onClose: () => {},
        })
    }

    const handleClickAddDiary = () => {
        open({
            Component: AddPopup,
            onClose: () => {},
        })
    }

    return (
        <div css={calendarStyles}>
            <Spacing size={20} />
            <TabContainer as="ul">
                <li>
                    <button onClick={() => {}} css={activeButtonStyles}>
                        캘린더
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/diary')}>다이어리</button>
                </li>
            </TabContainer>
            <Text
                display="inline-block"
                typography="t6"
                weight="semiBold"
                css={dateTitle}
                onClick={handleClickPopup}
            >
                {useFormatPickerDate(pickerDate)}
            </Text>
            <Calendar
                // onChange={handleChange}
                activeStartDate={pickerDate}
                tileContent={getTileContent}
                tileClassName={getTitleClass}
                locale="ko-KR"
                formatDay={(locale, date) => moment(date).format('D')}
                view="month"
                minDate={
                    new Date(pickerDate.getFullYear(), pickerDate.getMonth(), 1)
                }
                maxDate={
                    new Date(
                        pickerDate.getFullYear(),
                        pickerDate.getMonth() + 1,
                        0,
                    )
                } // 다음 달의 마지막 날}
            />
            <Flex justify="flex-end">
                <AddDiary onClick={handleClickAddDiary} />
            </Flex>
        </div>
    )
}

const dateTitle = css`
    padding-right: 22px;
    margin-bottom: 20px;
    background: url('/images/calendar/arrow_bottom.svg') no-repeat right center;
    background-size: 14px 7px;
`

const AddDiary = styled.button`
    margin-top: 52px;
    width: 54px;
    height: 54px;
    background: url('/images/addDiary.svg') no-repeat center;
    background-size: 22px;
    background-color: #000;
    border-radius: 50%;
`

const activeButtonStyles = css`
    background-color: var(--white);
`

export default CalendarBox
