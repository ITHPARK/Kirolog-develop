import CalendarPicker from '@components/calendar/CalendarPicker'
import Flex from '@shared/Flex'
import ReportAnalyze from '@components/report/ReportAnalyze'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useDrawerContext } from '@/context/DrawContext'
import useFormatPickerDate from '@hooks/useFormatPickerDate'
import { useState, useEffect, useCallback } from 'react'
import useUserStore from '@store/useUserStore'

const Report = () => {
    const { user } = useUserStore()
    const { open } = useDrawerContext()

    const [pickerDate, setPickerDate] = useState<Date>(new Date())
    const [weekObj, setWeekObj] = useState<Date[] | null>(null)

    const handleClickPopup = useCallback(() => {
        open({
            Component: CalendarPicker,
            componentProps: { setPickerDate: setPickerDate },
            onClose: () => {},
        })
    }, [])

    const handleClickWeek = useCallback(() => {
        open({
            Component: ReportAnalyze,
            // componentProps: { setPickerDate: setPickerDate },
            onClose: () => {},
            closeGray: true,
        })
    }, [pickerDate])

    useEffect(() => {
        console.log(pickerDate.getMonth() + 1)
        console.log(pickerDate.getDay())

        //연도와 월 구하기
        const year = pickerDate.getFullYear()
        const month = pickerDate.getMonth()

        //월의 시작 날짜와 마지막 날짜 구하기
        const start = new Date(year, month, 1)
        const arr = []

        //월의 첫 날짜부터 오늘날짜까지 순회한다.
        for (
            // start를 다시 날짜 객체로 만들어줘야한다. 아니면 start를 참조하여 currentDate가 변경되면 start도 변경된다.
            let currentDate = new Date(start);
            currentDate <= pickerDate; //오늘날짜까지만 순회
            currentDate.setDate(currentDate.getDate() + 1) //현재 날짜에서 +1 을 한다.
        ) {
            // 월의 시작 날짜는 일요일 것에 상관없이 넣어준다.
            if (currentDate.getDate() === 1) {
                console.log(currentDate)
                arr.push(new Date(currentDate)) // currentDate 복제해서 추가
            }

            // 일요일이면 날짜 추가(1일이 일요일이면 이미 위에서 추가 되었으니 제외한다.)
            if (currentDate.getDay() === 0 && !(currentDate.getDate() === 1)) {
                arr.push(new Date(currentDate)) // currentDate 복제해서 추가
            }
        }

        console.log(arr)
    }, [pickerDate])
    return (
        <Flex direction="column">
            <Spacing size={30} />
            <Flex
                direction="column"
                css={css`
                    padding: 0 20px;
                `}
            >
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
            </Flex>
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
                    {useFormatPickerDate(pickerDate)}
                </Text>
            </Flex>
            <Flex
                as="ul"
                direction="column"
                css={css`
                    padding: 0 20px;
                `}
            >
                <ListContainer
                    as="li"
                    justify="space-between"
                    onClick={handleClickWeek}
                >
                    <Flex align="center">
                        <Text typography="t2" weight="semiBold" color="gray800">
                            셋째주
                        </Text>
                        <Spacing size={4} direction="horizontal" />
                        <New>new</New>
                    </Flex>
                    <Flex justify="flex-end" align="center">
                        <Text typography="t1" color="gray400">
                            2024.12.15 ~12.21
                        </Text>
                    </Flex>
                </ListContainer>
                <ListContainer></ListContainer>
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
    background: url('/images/arrow/arrow_bottom.svg') no-repeat right center;
    background-size: 14px 7px;
`
