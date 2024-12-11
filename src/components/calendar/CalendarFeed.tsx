import { useState, useEffect } from 'react'
import calendarStyles from '@styles/calendarStyles'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import useFormatDate from '@hooks/useFormatDate'
import Text from '@shared/Text'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import DateTitle from '@components/calendar/DateTitle'

interface Props {
    date: string
    task: string
}

interface CalendarPickerProps {
    setPickerDate: React.Dispatch<React.SetStateAction<Date>>
    // other props
}

const CalendarFeed = () => {
    const [feedDate, setFeedDate] = useState<Props[] | null>(null)
    const [pickerDate, setPickerDate] = useState<Date>(new Date())
    const [feedList, setFeedList] = useState<any[]>([])

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

    useEffect(() => {
        const month = formatDate(pickerDate).split('-').slice(0, 2).join('-') // 현재 선택된 월

        const filteredTodos = todos.filter(
            (todo) => todo.date.split('-').slice(0, 2).join('-') === month, //  월을 기준으로 필터링
        )

        setFeedList(filteredTodos) // 필터링된 todo 항목들 출력
    }, [pickerDate])

    const handleClickFeed = () => {
        alert('일기 생성 페이지로 이동')
    }

    return (
        <div css={calendarStyles}>
            <DateTitle pickerDate={pickerDate} setPickerDate={setPickerDate} />
            <FeedContainer as="ul">
                {feedList.length > 0 ? (
                    feedList.map((item, index) => {
                        return (
                            <li key={index}>
                                <Flex direction="column">
                                    <Flex direction="column">
                                        <Text typography="t1" color="gray400">
                                            12.09
                                        </Text>
                                        <Spacing size={8} />
                                        <Flex align="center">
                                            <Text
                                                typography="t3"
                                                weight="bold"
                                                color="gray800"
                                            >
                                                행복함
                                            </Text>
                                            <Spacing
                                                size={4}
                                                direction="horizontal"
                                            />
                                            <span>아이콘</span>
                                        </Flex>
                                        <Text
                                            typography="t2"
                                            weight="regular"
                                            color="gray700"
                                            css={css`
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                display: -webkit-box;
                                                -webkit-line-clamp: 5;
                                                -webkit-box-orient: vertical;
                                            `}
                                        >
                                            가나다라마바사 가나다라마바사
                                            가나다라마바사 가나다라마바사
                                            가나다라마바사 가나다라마바사
                                            가나다라마바사 가나다라마바사
                                            가나다라마바사
                                        </Text>
                                    </Flex>
                                </Flex>
                            </li>
                        )
                    })
                ) : (
                    <li onClick={handleClickFeed}>
                        <Flex
                            direction="column"
                            justify="center"
                            align="center"
                            css={css`
                                height: 100%;
                            `}
                        >
                            <img
                                src="/images/diaryPlus.svg"
                                alt="플러스 아이콘"
                                css={addDiaryImg}
                            />
                            <Spacing size={9} />
                            <Text
                                typography="t2"
                                color="gray500"
                                align="center"
                            >
                                캘린더에서 일기를
                                <br />
                                작성해 보세요!
                            </Text>
                        </Flex>
                    </li>
                )}
            </FeedContainer>
        </div>
    )
}

const FeedContainer = styled(Flex)`
    width: 100%;
    gap: 10px;
    flex-wrap: wrap;

    li {
        padding: 18px;
        width: calc(50% - 5px);
        height: 200px;
        background-color: var(--gray100);
        border: 1px solid var(--gray200);
        border-radius: 6px;

        P {
            overflow: hidden; // 너비를 넘어가면 안보이게
            text-overflow: ellipsis; // 글자가 넘어가면 말줄임(...) 표시
        }
    }
`

const addDiaryImg = css`
    width: 22px;
    height: 22px;
`

export default CalendarFeed
