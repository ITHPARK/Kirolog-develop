import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import calendarStyles from '@styles/calendarStyles'
import useFormatDate from '@hooks/useFormatDate'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const CalendarBox = () => {
    //내가 선택한 월  함수
    const [selectedDate, setSelectedDate] = useState<Value>(new Date())

    //내가 선택한 날짜의 월
    const [currentMonth, setCurrentMonth] = useState<number | null>(
        new Date().getMonth() + 1,
    )

    const formatDate = useFormatDate()

    //mock 데이터
    const todos = [
        { date: '2024-12-04', task: 'Workout' },
        { date: '2024-12-05', task: 'Workout' },
        { date: '2024-12-07', task: 'Workout' },
        { date: '2024-12-09', task: 'Meeting' },
    ]

    //데이터의 날짜에 요소를 추가하는 함수(캐릭터 아이콘 추가 예정)
    const getTileContent = ({ date }: { date: Date }) => {
        //toLocaleDateString: JavaScript의 Date 객체에서 제공하는 메서드, 날짜를 지역화된 형식으로 문자열로 변환
        //날짜를 YYYY. M. D. 형식으로 로 변환한다
        const dateStr = formatDate(date)

        //todos를 순회하면서 date에서 dateStr을 찾는다
        const todo = todos.find((todo) => todo.date === dateStr)

        if (todo) {
            //요소를 리턴
            return <div style={{ color: 'red' }}>●</div>
        }
    }

    //달력에 표시하는 현재 월 말고는 색상을 흐리게 한다.
    const getTitleClass = ({ date, view }: { date: Date; view: string }) => {
        //월 페이지일 때
        if (view === 'month') {
            //각 날짜의 월
            const dayMonth = date.getMonth() + 1 //12월이 11월로 나와서 1을 더해줘야함

            if (currentMonth != dayMonth) {
                return 'different-month'
            }
        }
    }

    //월 페이지를 변경할 때마다 해당 페이지가 표시하는 월을 가져오는 함수
    const handleActiveStartDateChange = ({
        activeStartDate,
    }: {
        activeStartDate: Date | null
    }) => {
        if (activeStartDate != null) {
            console.log(activeStartDate.getMonth() + 1)
            setCurrentMonth(activeStartDate.getMonth() + 1)
        }
    }

    //날짜를 클릭했을 때
    const handleChange = (
        value: Value,
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        const currentDate = new Date()

        if (value != null) {
            //선택한 날짜가 현재날짜보다 이전일 때 동작한다. (오늘까지 포함)
            if (value < currentDate) {
                //state를 오늘 날짜로 설정
                setSelectedDate(value)

                //value가 날짜 데이터라면 (setRange아니면 다 Date다)
                if (value instanceof Date) {
                    const valueDate = formatDate(value)

                    console.log(valueDate)

                    //내가 선택한 날짜에 이미 추가된 일기 데이터가 있는지 여부 확인
                    const isData = todos.find((todo) => todo.date === valueDate)

                    if (isData != null) {
                        //일기 데이터가 있는것
                        alert('내가쓴 일기를 볼것.')
                    } else {
                        alert('일기를 추가한다.')
                    }
                }
            }
        }
    }

    useEffect(() => {
        // console.log(selectedDate)
    }, [selectedDate])

    return (
        <div css={calendarStyles}>
            <h2>일기쓴날짜</h2>
            <br />
            <ul>
                <li>2024-12-04</li>
                <li>2024-12-05</li>
                <li>2024-12-07</li>
                <li>2024-12-09</li>
            </ul>
            <Calendar
                onChange={handleChange}
                value={selectedDate}
                tileContent={getTileContent} //날짜(date)를 매개변수로 받아서 해당 날짜의 셀에 추가할 내용을 반환
                tileClassName={getTitleClass} //날짜(date)를 매개변수로 받아서 해당 날짜에 클래스를 추가
                onActiveStartDateChange={handleActiveStartDateChange}
            />
        </div>
    )
}

export default CalendarBox
