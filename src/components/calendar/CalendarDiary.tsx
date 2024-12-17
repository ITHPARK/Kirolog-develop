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
        const [diaryList, setDiaryList] = useState<DiaryProps[]>([])
        const { open } = useDrawerContext()
        const { diarys } = useDiaryStore()
        const formatDate = useFormatDate()

        const handleClickAddDiary = () => {
            open({
                Component: AddPopup,

                onClose: () => {},
            })
        }

        useEffect(() => {
            // 현재 선택된 월
            const month = formatDate(date).split('-').slice(0, 2).join('-')

            // 모든 일기 리스트에서 선택된 월의 일기만 가져온다.
            const filteredDiary = diarys.filter(
                (diary) => diary.ymd.split('-').slice(0, 2).join('-') === month,
            )

            setDiaryList(filteredDiary) // 필터링된 todo 항목들 출력
        }, [date, diarys])

        const handleClickFeed = () => {}

        return (
            <div css={calendarStyles}>
                <DateTitle pickerDate={date} setPickerDate={setDate} />
                <FeedContainer as="ul">
                    {diaryList.length > 0 ? (
                        diaryList.map((diary, index) => {
                            console.log(diary)
                            return (
                                <li key={`month-diary-${index}`}>
                                    <Link to={`/diary/${diary.id}`}>
                                        <Flex direction="column">
                                            {diary.images && <ImageArea />}
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
                                                    {`${diary.ymd.split('-')[1]}.${diary.ymd.split('-')[2]}`}
                                                </Text>
                                                <Spacing size={8} />
                                                <Flex align="center">
                                                    <Text
                                                        typography="t3"
                                                        weight="bold"
                                                        color="gray800"
                                                    >
                                                        {diary.moods}
                                                    </Text>
                                                    <Spacing
                                                        size={4}
                                                        direction="horizontal"
                                                    />
                                                    <MoodIcon
                                                        moodStr={diary.moods}
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
                                                    {diary.content}
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
                                    src="/images/calendar/diaryPlus.svg"
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
