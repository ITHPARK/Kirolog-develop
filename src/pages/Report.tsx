import CalendarPicker from "@components/calendar/CalendarPicker"
import Flex from "@shared/Flex"
import ReportAnalyze from "@components/report/ReportAnalyze"
import Spacing from "@shared/Spacing"
import Text from "@shared/Text"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { useDrawerContext } from "@/context/DrawContext"
import useFormatPickerDate from "@hooks/useFormatPickerDate"
import { useState, useEffect, useCallback } from "react"
import useUserStore from "@store/useUserStore"
import useFormatDate from "@hooks/useFormatDate"
import { useQuery } from "@tanstack/react-query"
import { getReport } from "@remote/report"
import { getWeekLabel } from "@utils/getWeekend"
import Loading from "@shared/Loading"

const Report = () => {
    const { user } = useUserStore()
    const { open } = useDrawerContext()
    const formatPickerDate = useFormatPickerDate()
    const formatDate = useFormatDate()

    const [pickerDate, setPickerDate] = useState<Date>(new Date())
    const [week, setWeek] = useState<string | null>(null)

    const { data: weeklyReport, isLoading: weeklyReportLoading } = useQuery({
        queryKey: ["week", week],
        queryFn: () => {
            if (!week) return []
            return getReport({ week: week, date: pickerDate })
        },
        enabled: week != null, //week가 null이 아닐때만 가져온다.
    })

    const handleClickPopup = useCallback(() => {
        open({
            Component: CalendarPicker,
            componentProps: { setPickerDate: setPickerDate },
            onClose: () => {},
        })
    }, [])

    const handleClickWeek = useCallback(
        (week: number, totalWeek: number) => {
            if (weeklyReport != null) {
                open({
                    Component: ReportAnalyze,
                    componentProps: {
                        weeklyReport: [...weeklyReport].reverse()[week],
                        week: week,
                        totalWeek: totalWeek,
                        date: pickerDate,
                    },
                    onClose: () => {},
                    closeGray: true,
                })
            }
        },
        [pickerDate, weeklyReport],
    )

    useEffect(() => {
        //연도와 월 구하기
        const year = pickerDate.getFullYear()
        const month = pickerDate.getMonth()

        //월의 시작 날짜와 마지막 날짜 구하기
        const start = new Date(year, month, 1)
        let arr = ""

        //월의 첫 날짜부터 오늘날짜까지 순회한다.
        for (
            // start를 다시 날짜 객체로 만들어줘야한다. 아니면 start를 참조하여 currentDate가 변경되면 start도 변경된다.
            let currentDate = new Date(start);
            currentDate <= pickerDate; //오늘날짜까지만 순회
            currentDate.setDate(currentDate.getDate() + 1) //현재 날짜에서 +1 을 한다
        ) {
            // 월의 시작 날짜는 일요일 것에 상관없이 넣어준다.
            if (currentDate.getDate() === 1) {
                const format = formatDate(new Date(currentDate))
                if (arr.length === 0) {
                    arr += `${format}` // currentDate 복제해서 추가
                }
            }

            // 토요일이면 날짜 추가(1일이 일요일이면 이미 위에서 추가 되었으니 제외한다)
            if (currentDate.getDay() === 6 && !(currentDate.getDate() === 1)) {
                const format = formatDate(new Date(currentDate))
                arr += `@${format}` // currentDate 복제해서 추가
            }

            //일요일 때는 시작날짜로 지정
            if (currentDate.getDay() === 0 && !(currentDate.getDate() === 1)) {
                const format = formatDate(new Date(currentDate))
                arr += `,${format}` // currentDate 복제해서 추가
            }

            //월 말일을 구한다
            if (
                currentDate.getDate() === new Date(year, month + 1, 0).getDate()
            ) {
                const format = formatDate(new Date(currentDate))
                arr += `@${format}` // currentDate 복제해서 추가
            }
        }
        setWeek(arr)
    }, [pickerDate])

    useEffect(() => {
        console.log(week)
    }, [week])

    if (weeklyReportLoading) {
        return <Loading />
    }

    return (
        <Flex direction="column">
            <Spacing size={30} />
            <ReportTopContainer direction="column">
                <Text typography="t4" weight="bold" color="primary500">
                    {user?.nickname}님!
                </Text>
                <Text typography="t4" weight="bold" color="gray800">
                    도착한 리포트를 확인하세요
                </Text>
                <Spacing size={4} />
                <Text typography="t1" weight="regular" color="gray500">
                    지금 바로 나의 상대를 파악해보세요!
                </Text>
                <Spacing size={40} />
            </ReportTopContainer>
            <Spacing size={8} color="gray100" />
            <Spacing size={28} />

            <Flex
                css={css`
                    padding: 0 20px;
                `}
            >
                <Text
                    display="inline-block"
                    typography="t6"
                    weight="semiBold"
                    css={dateTitle}
                    onClick={handleClickPopup}
                >
                    {formatPickerDate(pickerDate)}
                </Text>
            </Flex>

            <Flex
                as="ul"
                direction="column"
                css={css`
                    padding: 0 20px;
                `}
            >
                {weeklyReport &&
                    [...weeklyReport]
                        .filter(
                            (item) => item.recommendActivities !== "분석 불가",
                        )
                        .reverse()
                        .map((report, index) => {
                            const weekEnd = week
                                ?.split(",")
                                .filter(
                                    (item) =>
                                        item.split("@")[0] === report.weekStart,
                                )[0]
                                .split("@")[1]

                            return (
                                <ListContainer
                                    as="li"
                                    justify="space-between"
                                    onClick={() =>
                                        handleClickWeek(
                                            index,
                                            [...weeklyReport].length,
                                        )
                                    }
                                    key={index}
                                >
                                    <Flex align="center">
                                        <Text
                                            typography="t2"
                                            weight="semiBold"
                                            color="gray800"
                                        >
                                            {getWeekLabel(
                                                index,
                                                [...weeklyReport].length,
                                            )}
                                        </Text>
                                        <Spacing
                                            size={4}
                                            direction="horizontal"
                                        />
                                        {index === 0 && <New>new</New>}
                                    </Flex>
                                    <Flex justify="flex-end" align="center">
                                        <Text typography="t1" color="gray400">
                                            {report.weekStart
                                                .split("-")
                                                .join(".")}{" "}
                                            ~{weekEnd}
                                        </Text>
                                    </Flex>
                                </ListContainer>
                            )
                        })}
            </Flex>
        </Flex>
    )
}

export default Report

const ListContainer = styled(Flex)`
    padding: 20px;
    margin-bottom: 10px;
    background: var(--gray100);
    border-radius: 8px;
`
const New = styled.span`
    padding: 0 8px;
    display: inline-block
    font-size: 12px;
    color: var(--primary500);
    border-radius: 12px;
    background-color: var(--primary100);
`

const dateTitle = css`
    padding-right: 22px;
    margin-bottom: 20px;
    background: url("/images/arrow/arrow_bottom.svg") no-repeat right center;
    background-size: 14px 7px;
`

const ReportTopContainer = styled(Flex)`
    padding: 0 20px;
    background: url("/images/character/report_character.svg") no-repeat right
        5px bottom;
`
