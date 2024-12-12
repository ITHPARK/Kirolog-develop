import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import calendarStyles from '@styles/calendarStyles'
import useFormatDate from '@hooks/useFormatDate'
import moment from 'moment'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Text from '@shared/Text'
import { useDrawerContext } from '@/context/DrawContext'
import CalendarPicker from '@components/calendar/CalendarPicker'
import useFormatPickerDate from '@hooks/useFormatPickerDate'
import Flex from '@shared/Flex'
import AddPopup from '@components/diary/AddPopup'
import { useNavigate } from 'react-router-dom'
import TabContainer from '@shared/TabContainer'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const CalendarBox = () => {
    const { open } = useDrawerContext()
    const navigate = useNavigate()

    // 내가 선택한 날짜
    const [selectedDate, setSelectedDate] = useState<Value>(new Date())

    // 내가 선택한 날짜의 월
    const [currentMonth, setCurrentMonth] = useState<number | null>(
        new Date().getMonth() + 1,
    )

    const [pickerDate, setPickerDate] = useState<Date>(new Date())

    const formatDate = useFormatDate()
    const today = new Date()
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1) // 이번 달의 첫 날
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0) // 다음 달의 마지막 날

    useEffect(() => {
        setCurrentMonth(pickerDate.getMonth() + 1)
    }, [pickerDate, currentMonth])

    //mock 데이터
    const todos = [
        { date: '2024-12-04', task: 'Workout' },
        { date: '2024-12-05', task: 'Workout' },
        { date: '2024-12-07', task: 'Workout' },
        { date: '2024-12-09', task: 'Meeting' },
    ]

    // 날짜에 아이콘 추가
    const getTileContent = ({ date }: { date: Date }) => {
        const dateStr = formatDate(date)
        const today = formatDate(new Date())

        if (dateStr <= today) {
            const todo = todos.find((todo) => todo.date === dateStr)

            if (todo) {
                return <DayCircle className="day_circle" />
            }

            return <DayCircle css={circleStyles1} className="day_circle" />
        }

        if (dateStr > today) {
            return <DayCircle css={circleStyles2} className="day_circle" />
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

    // 날짜 선택 시
    const handleChange = (
        value: Value,
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        const currentDate = new Date()

        const currMonth = formatDate(currentDate)
            .split('-')
            .slice(0, 2)
            .join('')
        const selectMonth =
            value && value instanceof Date
                ? formatDate(value).split('-').slice(0, 2).join('')
                : ''

        if (value != null) {
            if (currMonth > selectMonth || currMonth < selectMonth) {
                return
            }

            if (value < currentDate) {
                setSelectedDate(value)

                if (value instanceof Date) {
                    const valueDate = formatDate(value)
                    const isData = todos.find((todo) => todo.date === valueDate)

                    if (isData != null) {
                        alert('내가쓴 일기를 볼것.')
                    } else {
                        alert('일기를 추가한다.')
                    }
                }
            }
        }
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
            <TabContainer as="ul">
                <li>
                    <button onClick={() => {}} css={activeButtonStyles}>
                        캘린더
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/main/diary')}>
                        다이어리
                    </button>
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
                onChange={handleChange}
                activeStartDate={pickerDate}
                tileContent={getTileContent}
                tileClassName={getTitleClass}
                locale="ko-KR"
                formatDay={(locale, date) => moment(date).format('D')}
                view="month"
                minDate={minDate}
                maxDate={maxDate}
            />
            <Flex justify="flex-end">
                <AddDiary onClick={handleClickAddDiary} />
            </Flex>
        </div>
    )
}

const DayCircle = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
`

const circleStyles1 = css`
    background-color: var(--white);
`

const circleStyles2 = css`
    background-color: var(--gray100);
`

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
