import CalendarDiary from '@/components/calendar/CalendarDiary'
import CalendarView from '@/components/calendar/CalendarView'
import TabContainer from '@shared/TabContainer'
import { css } from '@emotion/react'
import { useCalendar } from '@store/useCalendar'
import { useState } from 'react'

const CalendarContent = () => {
    // const [calendarDate, setCalendarDate] = useState<Date>(new Date())
    // const [diaryDate, setDiaryDate] = useState<Date>(new Date())
    const { tab, viewDate, diaryDate, setTab, setViewDate, setDiaryDate } =
        useCalendar()

    return (
        <div>
            <TabContainer>
                <ul>
                    <li>
                        <button
                            onClick={() => setTab(1)}
                            css={tab === 1 ? activeButtonStyles : null}
                        >
                            캘린더
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setTab(2)}
                            css={tab === 2 ? activeButtonStyles : null}
                        >
                            다이어리
                        </button>
                    </li>
                </ul>
            </TabContainer>
            {tab === 1 && (
                <CalendarView date={viewDate} setDate={setViewDate} />
            )}

            {tab === 2 && (
                <CalendarDiary date={diaryDate} setDate={setDiaryDate} />
            )}
        </div>
    )
}

const activeButtonStyles = css`
    background-color: var(--white);
`

export default CalendarContent
