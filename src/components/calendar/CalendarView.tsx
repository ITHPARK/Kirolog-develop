import React, { useEffect, useState } from 'react'

import AddPopup from '@components/diary/AddPopup'
import Calendar from 'react-calendar'
import CalendarPicker from '@components/calendar/CalendarPicker'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import calendarStyles from '@styles/calendarStyles'
import { css } from '@emotion/react'
import moment from 'moment'
import styled from '@emotion/styled'
import { useDrawerContext } from '@/context/DrawContext'
import useFormatDate from '@hooks/useFormatDate'
import useFormatPickerDate from '@hooks/useFormatPickerDate'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getDiary } from '@remote/diary'
import { useDiaryStore } from '@store/useDiary'
import { DiaryProps } from '@models/diary'
import DayCircle from '@components/calendar/DayCircle'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

//날짜가 바뀌지 않으면 다시 렌더링하지 않게 메모
const CalendarView = React.memo(
    ({
        date,
        setDate,
    }: {
        date: Date
        setDate: React.Dispatch<React.SetStateAction<Date>>
        //SetStateAction는 제네릭 타입
        //Date 타입의 값 또는 이전 상태를 기반으로 새로운 Date를 반환하는 함수 중 하나를 받을 수 있다.
    }) => {
        const { open } = useDrawerContext()
        const navigate = useNavigate()
        const { diarys, setDiarys } = useDiaryStore()
        const formatDate = useFormatDate()
        // 날짜 데이터를 (12.09) 형식으로 바꿔주는 훅
        const formattedPickerDate = useFormatPickerDate(date)

        // 내가 선택한 날짜의 월
        const [currentMonth, setCurrentMonth] = useState<number | null>(
            new Date().getMonth() + 1,
        )

        // const { data, isLoading } = useQuery({
        //     queryKey: ['diary'],
        //     queryFn: () => getDiary(),
        //     retry: false,
        // })

        // useEffect(() => {
        //     //리액트 쿼리로 데이터를 받으면 전역에 저장
        //     if (data != null && data.length > 0) {
        //         //받은 모든 일기 리스트에서 ymd를 (2024=12-14)형식으로 바꾼다.
        //         const format = data.map((item: DiaryProps) => {
        //             const formatDate = item.ymd.split('T')[0]
        //             return { ...item, ymd: formatDate }
        //         })
        //         setDiarys(format)
        //     }
        // }, [data])

        useEffect(() => {
            setCurrentMonth(date.getMonth() + 1)
        }, [date, currentMonth])

        // 날짜에 커스텀 요소 추가
        const getTileContent = ({ date }: { date: Date }) => {
            const dateStr = formatDate(date)
            const today = formatDate(new Date())

            if (dateStr <= today) {
                const diary = diarys.find((item) => item.ymd === dateStr)

                //일기를 쓴 날에 추가
                if (diary) {
                    return (
                        <DayCircle
                            moodStr={diary.moods}
                            onClick={() => navigate(`/diary/${diary.id}`)}
                        />
                    )
                } else if (dateStr === today) {
                    //오늘 아직 일기를 쓰지 않았다면 클릭했을 때 일기 추가를 뜨게 한다.
                    return (
                        <DayCircle today={true} onClick={handleClickAddDiary} />
                    )
                }
            }

            //오늘 날짜보다 큰날(미래)는 회색 동그라미 추가
            if (dateStr > today) {
                return <DayCircle />
            }
        }

        // 현재 달력 페이지를 순회하면서 각 조건마다 클래스를 추가한다.
        const getTitleClass = ({
            date,
            view,
        }: {
            date: Date
            view: string
        }) => {
            let classes = ''

            const today = new Date(date)

            //시간을 00시로 설정
            today.setHours(0, 0, 0, 0)

            //현재 보기가 월이라면 ex)12월의 달력을 보는것
            if (view === 'month') {
                //현재 월을 가져온다.
                const dayMonth = date.getMonth() + 1

                //순회하는 날짜가 오늘보다 큰 날짜(미래)라면
                if (date > today) {
                    classes += 'future-date '
                }

                //현재 월과 다른 월의 날짜 ex) 12월일 때 몇개씩 보이는 11월과 1월의 날짜
                //안보이게 하기위한 클래스 추가
                if (currentMonth !== dayMonth) {
                    classes += 'different-month '
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
            open({
                Component: AddPopup,
                onClose: () => {},
            })
        }

        // if (isLoading) {
        //     return <div>로딩중입니다.</div>
        // }

        return (
            <div css={calendarStyles}>
                <Text
                    display="inline-block"
                    typography="t6"
                    weight="semiBold"
                    css={dateTitle}
                    onClick={handleClickPopup}
                >
                    {formattedPickerDate}
                </Text>
                <Calendar
                    activeStartDate={date}
                    tileContent={getTileContent}
                    tileClassName={getTitleClass}
                    formatDay={(locale, date) => moment(date).format('D')} // 일 삭제
                    view="month"
                    minDate={new Date(date.getFullYear(), date.getMonth(), 1)} //선택할 수 있는 최소일은 이번달 1일부터
                    maxDate={
                        new Date(date.getFullYear(), date.getMonth() + 1, 0)
                    } // 선택할 수 있는 최대 일을 이번달말까지
                />
                <Flex justify="flex-end">
                    <AddDiary onClick={handleClickAddDiary} />
                </Flex>
            </div>
        )
    },
)

const dateTitle = css`
    padding-right: 22px;
    margin-bottom: 20px;
    background: url('/images/arrow/arrow_bottom.svg') no-repeat right center;
    background-size: 14px 7px;
`

const AddDiary = styled.button`
    margin-top: 52px;
    width: 54px;
    height: 54px;
    background: url('/images/calendar/addDiary.svg') no-repeat center;
    background-size: 22px;
    background-color: #000;
    border-radius: 50%;
`

export default CalendarView
