import { mood } from '@utils/moodContent'
import styled from '@emotion/styled'

interface CircleProps {
    onClick?: () => void
    moodStr?: string
    today?: boolean
}

// DayCircle 컴포넌트
const DayCircle = ({ moodStr = '', onClick, today }: CircleProps) => {
    const moodType = Object.entries(mood).find(([_, { subMood }]) =>
        subMood.includes(moodStr),
    )?.[1].title

    return (
        <DayCircleStyles moodType={moodType} onClick={onClick} today={today} />
    )
}

// DayCircleStyles 컴포넌트
const DayCircleStyles = styled.div<{
    moodType?: string
    today?: boolean
}>`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    ${(props) =>
        props.today
            ? `background: url('/images/calendar/diary_plus.png') no-repeat center;
               background-size: 100%;`
            : `background-color: ${
                  props.moodType === '희'
                      ? '#FFECA7'
                      : props.moodType === '노'
                        ? '#FFD0D0'
                        : props.moodType === '애'
                          ? '#C1E8FF'
                          : props.moodType === '락'
                            ? '#FFD2A7'
                            : '#F7F8FA'
              };`}
`

export default DayCircle
