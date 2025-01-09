import React, { useEffect, useState } from "react"

import AddPopup from "@components/diary/AddPopup"
import DateTitle from "@components/calendar/DateTitle"
import { DiaryProps } from "@models/diary"
import { DiaryResponseProps } from "@models/diary"
import Flex from "@shared/Flex"
import { Link } from "react-router-dom"
import MoodIcon from "@components/diary/MoodIcon"
import Spacing from "@shared/Spacing"
import Text from "@shared/Text"
import calendarStyles from "@styles/calendarStyles"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import useDiaryData from "@hooks/useDiaryData"
import { useDrawerContext } from "@/context/DrawContext"
import useFormatDate from "@hooks/useFormatDate"

const CalendarDiary = React.memo(
    ({
        date,
        setDate,
    }: {
        date: Date
        setDate: (date: Date) => void
        //SetStateAction는 제네릭 타입
        //Date 타입의 값 또는 이전 상태를 기반으로 새로운 Date를 반환하는 함수 중 하나를 받을 수 있다.
    }) => {
        const [diaryList, setDiaryList] = useState<DiaryProps[]>([])

        const [today, setToday] = useState(new Date())
        const { open } = useDrawerContext()
        const formatDate = useFormatDate()
        const handleClickAddDiary = () => {
            open({
                Component: AddPopup,

                onClose: () => {},
            })
        }

        const { data: diarys } = useDiaryData()

        useEffect(() => {
            // 현재 선택된 월
            const month = formatDate(date).split("-").slice(0, 2).join("-")

            // 모든 일기 리스트에서 선택된 월의 일기만 가져온다.
            const filteredDiary = diarys.filter(
                (diary: DiaryResponseProps) =>
                    diary.ymd.split("-").slice(0, 2).join("-") === month,
            )

            setDiaryList(filteredDiary) // 필터링된 todo 항목들 출력
        }, [date, diarys])

        return (
            <div css={calendarStyles}>
                <DateTitle pickerDate={date} setPickerDate={setDate} />
                <DiaryContainer as="ul">
                    {diaryList.length > 0 ? (
                        diaryList.map((diary, index) => {
                            return (
                                <li key={`month-diary-${index}`}>
                                    <Link to={`/diary/${diary.id}`}>
                                        <Flex
                                            direction="column"
                                            css={css`
                                                height: 100%;
                                            `}
                                        >
                                            {diary.presignedUrl && (
                                                <ImageArea
                                                    src={diary.presignedUrl}
                                                />
                                            )}
                                            <Flex
                                                direction="column"
                                                css={css`
                                                    height: 50%;
                                                    padding: 18px;
                                                `}
                                            >
                                                <Text
                                                    typography="t1"
                                                    color="gray400"
                                                >
                                                    {`${diary.ymd.split("-")[1]}.${diary.ymd.split("-")[2]}`}
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
                                                        -webkit-line-clamp: ${diary.presignedUrl
                                                            ? "1"
                                                            : "5"};
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
                    ) : date.getMonth() >= today.getMonth() &&
                      date.getMonth() < today.getMonth() ? (
                        <li>
                            <Flex
                                direction="column"
                                justify="center"
                                align="center"
                                css={css`
                                    height: 200px;
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
                    ) : null}
                </DiaryContainer>
            </div>
        )
    },
)

const DiaryContainer = styled(Flex)`
    width: 100%;
    gap: 10px;
    flex-wrap: wrap;

    li {
        width: calc(50% - 5px);

        background-color: var(--gray100);
        border: 1px solid var(--gray200);
        border-radius: 6px;
        overflow: hidden;
        a {
            height: 200px;
            display: block;

            P {
                overflow: hidden; // 너비를 넘어가면 안보이게
                text-overflow: ellipsis; // 글자가 넘어가면 말줄임(...) 표시
            }
        }
    }
`

const ImageArea = styled.div<{ src: string }>`
    flex: 1;
    width: 100%;
    background: url("${(props) => props.src}") no-repeat;

    background-size: cover;
    background-position: center;
    border-radius: 8px 8px 0 0;
`

const addDiaryImg = css`
    width: 22px;
    height: 22px;
`

export default CalendarDiary
