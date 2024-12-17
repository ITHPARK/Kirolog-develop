import { useState } from 'react'
import CalendarView from '@/components/calendar/CalendarView'
import CalendarFeed from '@/components/calendar/CalendarDiary'
import { css } from '@emotion/react'
import TabContainer from '@shared/TabContainer'

const CalendarContent = () => {
    const [viewTab, setViewTab] = useState<number>(1)
    const [calendarDate, setCalendarDate] = useState<Date>(new Date())
    const [diaryDate, setDiaryDate] = useState<Date>(new Date())

    return (
        <div>
            <TabContainer>
                <ul>
                    <li>
                        <button
                            onClick={() => setViewTab(1)}
                            css={viewTab === 1 ? activeButtonStyles : null}
                        >
                            캘린더
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setViewTab(2)}
                            css={viewTab === 2 ? activeButtonStyles : null}
                        >
                            다이어리
                        </button>
                    </li>
                </ul>
            </TabContainer>
            {viewTab === 1 && (
                <CalendarView date={calendarDate} setDate={setCalendarDate} />
            )}

            {viewTab === 2 && (
                <CalendarFeed date={diaryDate} setDate={setDiaryDate} />
            )}
        </div>
    )
}

const activeButtonStyles = css`
    background-color: var(--white);
`

export default CalendarContent
