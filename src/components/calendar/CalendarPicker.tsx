import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import calendarStyles from '@styles/calendarStyles'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

interface PickerProps {
    onClose: () => void // onClose prop 타입 정의
    setPickerDate: (date: Date) => void
}

const CalendarPicker = ({ onClose, setPickerDate }: PickerProps) => {
    const [date, setDate] = useState<Date>(new Date())
    const [year, setYear] = useState<number>(date.getFullYear())

    //화살표 클릭할 때마다 년도 수정
    const handleClickYear = (set: number) => {
        const currentYear = new Date().getFullYear() // 현재 년도
        if (set === 1) {
            if (year < currentYear) {
                setDate((prevDate) => {
                    const newDate = new Date(prevDate)
                    newDate.setFullYear(prevDate.getFullYear() + 1)
                    setYear(newDate.getFullYear())
                    return newDate
                })
            }
        } else {
            setDate((prevDate) => {
                const newDate = new Date(prevDate)
                newDate.setFullYear(prevDate.getFullYear() - 1)
                setYear(newDate.getFullYear())
                return newDate
            })
        }
    }

    //클릭한 월 데이터까지 수집해서 새로운 날짜 객체를 만든다.
    const hadleClickMonth = (set: number) => {
        const dateNew = new Date(year, set, 0)
        setDate(dateNew)
        setPickerDate(dateNew)
        onClose()
    }

    return (
        <div css={calendarStyles}>
            <Flex justify="center" align="center">
                <ArrowLeft onClick={() => handleClickYear(0)} />
                <Text
                    typography="t4"
                    weight="bold"
                    color="gray800"
                    css={css`
                        margin: 0 35px;
                    `}
                >
                    {date.getFullYear()}년
                </Text>
                <ArrowRight onClick={() => handleClickYear(1)} />
            </Flex>
            <MonthPicker as="ul">
                {Array.from({ length: 12 }, (_, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => hadleClickMonth(index + 1)}
                        >
                            {index + 1}월
                        </li>
                    )
                })}
            </MonthPicker>
            <Spacing size={22} />
        </div>
    )
}

const ArrowLeft = styled.div`
    width: 8px;
    height: 14px;
    background: url('/images/calendar/arrow_left.svg') no-repeat center;
    background-size: 100%;
`

const ArrowRight = styled.div`
    width: 8px;
    height: 14px;
    background: url('/images/calendar/arrow_right.svg') no-repeat center;
    background-size: 100%;
`

const MonthPicker = styled(Flex)`
    margin-top: 20px;
    width: 100%;
    flex-wrap: wrap;
    gap: 8px;

    li {
        padding: 15px 0;
        flex: calc(33% - 5px);
        background-color: var(--gray200);
        font-size: 14px;
        font-weight: 800;
        color: var(--gray600);
        text-align: center;
        line-height: 1.5;
        border-radius: 8px;
    }
`

export default CalendarPicker
