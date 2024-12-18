import { mood } from '@/constants/moodContent'
import styled from '@emotion/styled'

const MoodIcon = ({ moodStr }: { moodStr: string }) => {
    // mood 객체를 돌며 일기 감정이 포함된 대분류를 찾는다.
    const moodType = Object.entries(mood).find(([_, { subMood }]) =>
        subMood.includes(moodStr),
    )?.[1].title // mood 객체의 title 반환

    // 대분류가 없는 경우 처리
    if (!moodType) return null

    return <StyledMoodIcon moodType={moodType}></StyledMoodIcon>
}

// 스타일 정의
const StyledMoodIcon = styled.span<{ moodType: string }>`
    display: inline-block;
    background-image: ${(props) =>
        props.moodType === '희'
            ? "url('/images/moodicon/happiness.png')"
            : props.moodType === '노'
              ? "url('/images/moodicon/anger.png')"
              : props.moodType === '애'
                ? "url('/images/moodicon/sadness.png')"
                : props.moodType === '락'
                  ? "url('/images/moodicon/enjoyment.png')"
                  : 'none'};
    background-size: 100%;
    background-position: center;
    color: #fff;
    width: 16px;
    height: 16px;
`

export default MoodIcon
