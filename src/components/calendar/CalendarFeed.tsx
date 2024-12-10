import { useState } from 'react'
import Calendar from 'react-calendar'
import calendarStyles from '@styles/calendarStyles'
import { css } from '@emotion/react'
import useFormatDate from '@hooks/useFormatDate'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

interface Props {
    date: string
    task: string
}

const CalendarFeed = () => {
    const [feedDate, setFeedDate] = useState<Props[] | null>(null)

    const todos = [
        { date: '2024-09-01', task: 'Workout' },
        { date: '2024-09-02', task: 'Workout' },
        { date: '2024-09-03', task: 'Workout' },
        { date: '2024-09-04', task: 'Workout' },
        { date: '2024-09-05', task: 'Workout' },
        { date: '2024-12-05', task: 'Workout' },
        { date: '2024-12-07', task: 'Workout' },
        { date: '2024-12-09', task: 'Meeting' },
    ]

    const formatDate = useFormatDate()

    const handleChange = (data: Record<string, any>) => {
        if (data.action === 'drillDown') {
            // activeStartDate를 포맷하여 'YYYY-MM-DD' 형식으로 변환
            const date = formatDate(data.activeStartDate)
                .split('-') // '-' 기준으로 나누기
                .slice(0, 2) // 연도와 월만 추출
                .join('-') // 연-월 형식으로 합치기

            const feed = todos.filter((todo) => {
                // todo.date에서 연도와 월만 추출하여 비교
                const a = todo.date.split('-').slice(0, 2).join('-')
                return a === date
            })

            setFeedDate(feed)
        }
    }

    return (
        <div css={calendarStyles}>
            <Calendar
                className="feed_calendar"
                view="year"
                onActiveStartDateChange={handleChange}
                minDetail="year"
            />

            {todos != null
                ? feedDate?.map((item) => {
                      return (
                          <div style={{ marginBottom: '20px' }}>
                              <p>날짜: {item.date}</p>
                              <p>내용: {item.task}</p>
                          </div>
                      )
                  })
                : ''}
        </div>
    )
}

export default CalendarFeed
