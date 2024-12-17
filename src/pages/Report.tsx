import CalendarPicker from '@components/calendar/CalendarPicker'
import Flex from '@shared/Flex'
import ReportAnalyze from '@components/report/ReportAnalyze'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useDrawerContext } from '@/context/DrawContext'
import useFormatPickerDate from '@hooks/useFormatPickerDate'
import { useState } from 'react'
import useUserStore from '@store/useUserStore'

const Report = () => {
    const { user } = useUserStore()
    const { open } = useDrawerContext()

    const [pickerDate, setPickerDate] = useState<Date>(new Date())

    const handleClickPopup = () => {
        open({
            Component: CalendarPicker,
            componentProps: { setPickerDate: setPickerDate },
            onClose: () => {},
        })
    }

    const handleClickWeek = () => {
        open({
            Component: ReportAnalyze,
            // componentProps: { setPickerDate: setPickerDate },
            onClose: () => {},
            closeGray: true,
        })
    }

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
