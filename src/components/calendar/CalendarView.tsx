import React, { useEffect, useState } from "react"

import AddPopup from "@components/diary/AddPopup"
import Calendar from "react-calendar"
import CalendarPicker from "@components/calendar/CalendarPicker"
import DayCircle from "@components/calendar/DayCircle"
import { DiaryProps } from "@models/diary"
import { DiaryResponseProps } from "@models/diary"
import Flex from "@shared/Flex"
import Text from "@shared/Text"
import calendarStyles from "@styles/calendarStyles"
import { css } from "@emotion/react"
import moment from "moment"
import styled from "@emotion/styled"
import useDiaryData from "@hooks/useDiaryData"
import { useDrawerContext } from "@/context/DrawContext"
import useFormatDate from "@hooks/useFormatDate"
import useFormatPickerDate from "@hooks/useFormatPickerDate"
import { useNavigate } from "react-router-dom"
import { ReactComponent as AddDiaryIcon } from "@assets/icons/addDiary.svg"
import ArrowDown from "@shared/ArrowDown"

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

//날짜가 바뀌지 않으면 다시 렌더링하지 않게 메모
const CalendarView = React.memo(
    ({
        date,
        setDate,
    }: {
        date: Date
        setDate: (date: Date) => void
        //SetStateAction는 제네릭 타입
        //Date 타입의 값 또는 이전 상태를 기반으로 새로운 Date를 반환하는 함수 중 하나를 받을 수 있다.
    }) => {
        const { open } = useDrawerContext()
        const navigate = useNavigate()
        const formatDate = useFormatDate()
        // 날짜 데이터를 (12.09) 형식으로 바꿔주는 훅
        const formatPickerDate = useFormatPickerDate()

        // 내가 선택한 날짜의 월
        const [currentMonth, setCurrentMonth] = useState<number | null>(
            new Date().getMonth() + 1,
        )

        const { data: diaryData, isLoading } = useDiaryData()

        useEffect(() => {
            //리액트 쿼리로 데이터를 받으면 전역에 저장
            if (diaryData != null && diaryData.length > 0) {
                //받은 모든 일기 리스트에서 ymd를 (2024-12-14)형식으로 바꾼다.
                const format = diaryData.map((item: DiaryProps) => {
                    const formatDate = item.ymd.split("T")[0]
                    return { ...item, ymd: formatDate }
                })
            }
        }, [diaryData])

        useEffect(() => {
            setCurrentMonth(date.getMonth() + 1)
        }, [date, currentMonth])

        // 날짜에 커스텀 요소 추가
        const getTileContent = ({ date }: { date: Date }) => {
            const dateStr = formatDate(date)
            const today = formatDate(new Date())

            if (dateStr <= today) {
                const diary = diaryData.find(
                    (item: DiaryResponseProps) => item.ymd === dateStr,
                )

                //일기를 쓴 날에 추가
                if (diary) {
                    return <DayCircle moodStr={diary.moods} />
                } else if (dateStr === today) {
                    //오늘 아직 일기를 쓰지 않았다면 클릭했을 때 일기 추가를 뜨게 한다.
                    return <DayCircle today={true} />
                }
            }

            //오늘 날짜보다 큰날(미래)는 회색 동그라미 추가
            if (dateStr > today) {
                return <DayCircle />
            }
        }

        const handleClickDay = (
            date: Date,
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        ) => {
            const dateStr = formatDate(date)
            const today = formatDate(new Date())

            if (dateStr <= today) {
                const diary = diaryData.find(
                    (item: DiaryResponseProps) => item.ymd === dateStr,
                )

                //일기를 쓴 날에 추가
                if (diary) {
                    return navigate(`/diary/${diary.id}`)
                } else if (dateStr === today) {
                    return handleClickAddDiary()
                }
            }

            return
        }

        // 현재 달력 페이지를 순회하면서 각 조건마다 클래스를 추가한다.
        const getTitleClass = ({
            date,
            view,
        }: {
            date: Date
            view: string
        }) => {
            let classes = ""

            const today = new Date(date)

            //시간을 00시로 설정
            today.setHours(0, 0, 0, 0)

            //현재 보기가 월이라면 ex)12월의 달력을 보는것
            if (view === "month") {
                //현재 월을 가져온다.
                const dayMonth = date.getMonth() + 1

                //순회하는 날짜가 오늘보다 큰 날짜(미래)라면
                if (date > today) {
                    classes += "future-date "
                }

                //현재 월과 다른 월의 날짜 ex) 12월일 때 몇개씩 보이는 11월과 1월의 날짜
                //안보이게 하기위한 클래스 추가
                if (currentMonth !== dayMonth) {
                    classes += "different-month "
                }
            }

            //순회하는 날에 클래스를 추가
            return classes
        }

        //월 picker 팝업
        const handleClickPopup = () => {
            open({
                Component: CalendarPicker,
                componentProps: { setPickerDate: setDate },
                onClose: () => {},
            })
        }

        //일기추가 팝업
        const handleClickAddDiary = () => {
            //오늘 일기를 썻다면
            if (
                diaryData.length > 0 &&
                diaryData[diaryData.length - 1].ymd === formatDate(new Date())
            ) {
                alert("일기는 하루에 한번만 작성이 가능합니다.")
            } else {
                open({
                    Component: AddPopup,
                    onClose: () => {},
                })
            }
        }

        if (isLoading) {
            return <div>로딩중입니다.</div>
        }

        return (
            <div css={calendarStyles}>
                <Flex
                    justify="space-between"
                    css={css`
                        margin-bottom: 20px;
                    `}
                >
                    <Text
                        display="inline-block"
                        typography="t6"
                        weight="semiBold"
                        css={dateTitle}
                        onClick={handleClickPopup}
                    >
                        <ArrowDown />
                        {formatPickerDate(date)}
                    </Text>
                    <MoodGuide as="ul">
                        <li>희</li>
                        <li>로</li>
                        <li>애</li>
                        <li>락</li>
                    </MoodGuide>
                </Flex>
                <Calendar
                    calendarType="gregory"
                    activeStartDate={date}
                    tileContent={getTileContent}
                    tileClassName={getTitleClass}
                    formatDay={(locale, date) => moment(date).format("D")} // 일 삭제
                    view="month"
                    minDate={new Date(date.getFullYear(), date.getMonth(), 1)} //선택할 수 있는 최소일은 이번달 1일부터
                    maxDate={
                        new Date(date.getFullYear(), date.getMonth() + 1, 0)
                    } // 선택할 수 있는 최대 일을 이번달말까지
                    onClickDay={handleClickDay}
                />

                <AddDiary onClick={handleClickAddDiary}>
                    <AddDiaryIcon />
                </AddDiary>
            </div>
        )
    },
)

const dateTitle = css`
    padding-right: 22px;
    position: relative;
`
const arrowPos = css`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
`

const AddDiary = styled.button`
    position: fixed;
    bottom: 128px;
    right: 20px;
    width: 54px;
    height: 54px;

    background-size: 22px;
    background-color: #000;
    border-radius: 50%;
`

const MoodGuide = styled(Flex)`
    width: unset;
    align-items: end;
    gap: 12px;

    li {
        padding-left: 10px;
        position: relative;
        font-size: 14px;
        font-weight: 500;
        color: var(--gray500);
        line-height: 1.5;

        &::after {
            content: "";
            width: 8px;
            height: 8px;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            display: block;
            position: absolute;
            border-radius: 50%;
        }

        &:nth-of-type(1)::after {
            background-color: #ffeca7;
        }

        &:nth-of-type(2)::after {
            background-color: #ffd0d0;
        }

        &:nth-of-type(3)::after {
            background-color: #c1e8ff;
        }

        &:nth-of-type(4)::after {
            background-color: #ffd2a7;
        }
    }
`

export default CalendarView
