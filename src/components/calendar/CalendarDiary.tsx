import React, { useState, useEffect } from 'react'
import calendarStyles from '@styles/calendarStyles'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import useFormatDate from '@hooks/useFormatDate'
import Text from '@shared/Text'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import DateTitle from '@components/calendar/DateTitle'
import { Link } from 'react-router-dom'
import { useDiaryStore } from '@store/useDiary'
import { DiaryProps } from '@models/diary'
import MoodIcon from '@components/diary/MoodIcon'
import { useDrawerContext } from '@/context/DrawContext'
import AddPopup from '@components/diary/AddPopup'

const CalendarDiary = React.memo(
    ({
        date,
        setDate,
    }: {
        date: Date
        setDate: React.Dispatch<React.SetStateAction<Date>>
        //SetStateAction는 제네릭 타입
        //Date 타입의 값 또는 이전 상태를 기반으로 새로운 Date를 반환하는 함수 중 하나를 받을 수 있다.
    }) => {
        const [feedList, setFeedList] = useState<DiaryProps[]>([])
        const { open } = useDrawerContext()
        const { diarys } = useDiaryStore()
        const formatDate = useFormatDate()

        const handleClickAddDiary = () => {
            open({
                Component: AddPopup,

                onClose: () => {},
            })
        }

        // const handleChange = (data: Record<string, any>) => {
        //     if (data.action === 'drillDown') {
        //         // activeStartDate를 포맷하여 'YYYY-MM-DD' 형식으로 변환
        //         const date = formatDate(data.activeStartDate)
        //             .split('-') // '-' 기준으로 나누기
        //             .slice(0, 2) // 연도와 월만 추출
        //             .join('-') // 연-월 형식으로 합치기

        //         const feed = diarys.filter((diary) => {
        //             // todo.date에서 연도와 월만 추출하여 비교
        //             const a = diary.ymd.split('-').slice(0, 2).join('-')
        //             return a === date
        //         })

        //         setFeedDate(feed)
        //     }
        // }

        useEffect(() => {
            const month = formatDate(date).split('-').slice(0, 2).join('-') // 현재 선택된 월

            const filteredDiary = diarys.filter(
                (diary) => diary.ymd.split('-').slice(0, 2).join('-') === month, //  월을 기준으로 필터링
            )

            setFeedList(filteredDiary) // 필터링된 todo 항목들 출력
        }, [date, diarys])

        const handleClickFeed = () => {}

        return (
            <div css={calendarStyles}>
                <DateTitle pickerDate={date} setPickerDate={setDate} />
                <FeedContainer as="ul">
                    {feedList.length > 0 ? (
                        feedList.map((item, index) => {
                            console.log(item)
                            return (
                                <li key={index}>
                                    <Link to={`/diary/${item.id}`}>
                                        <Flex direction="column">
                                            {item.images && <ImageArea />}
                                            <Flex
                                                direction="column"
                                                css={css`
                                                    flex: 1;
                                                `}
                                            >
                                                <Text
                                                    typography="t1"
                                                    color="gray400"
                                                >
                                                    {`${item.ymd.split('-')[1]}.${item.ymd.split('-')[2]}`}
                                                </Text>
                                                <Spacing size={8} />
                                                <Flex align="center">
                                                    <Text
                                                        typography="t3"
                                                        weight="bold"
                                                        color="gray800"
                                                    >
                                                        {item.moods}
                                                    </Text>
                                                    <Spacing
                                                        size={4}
                                                        direction="horizontal"
                                                    />
                                                    <MoodIcon
                                                        moodStr={item.moods}
                                                    />
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
                                                    {item.content}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Link>
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
                                onClick={() => handleClickAddDiary()}
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
                                    일기를
                                    <br />
                                    작성해 보세요!
                                </Text>
                            </Flex>
                        </li>
                    )}
                </FeedContainer>
            </div>
        )
    },
)

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

const ImageArea = styled.img`
    flex: 1;
    width: 100%;
    background: #ddd;
    border-radius: 8px;
    object-fit: cover;
`

const addDiaryImg = css`
    width: 22px;
    height: 22px;
`

export default CalendarDiary
