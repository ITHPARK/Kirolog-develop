import Text from '@shared/Text'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Button from '@shared/Button'
import { WeeklyReportProps } from '@models/report'
import { getWeekLabel } from '@utils/getWeekend'

const ReportAnalyze = ({
    onClose,
    weeklyReport,
    week,
    totalWeek,
    date,
}: {
    onClose: () => void
    weeklyReport: WeeklyReportProps
    week: number
    totalWeek: number
    date: Date
}) => {
    return (
        <>
            <Flex direction="column">
                <Text typography="t2" weight="semiBold" color="gray500">
                    {`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${getWeekLabel(week, totalWeek)}`}
                </Text>
                <Spacing size={30} />
                <Flex direction="column">
                    <AnalyzeTitle typography="t3" weight="bold" color="gray600">
                        이번주 감정 분석
                    </AnalyzeTitle>
                    <Spacing size={16} />
                    <WeekText justify="center">
                        <Text typography="t3" weight="bold" color="primary500">
                            {weeklyReport.emotionsSummary}
                        </Text>
                    </WeekText>
                    <Spacing size={12} />
                    <Flex direction="column">
                        <Text typography="t1" color="gray500">
                            {weeklyReport.consolation}
                        </Text>
                    </Flex>
                    <Spacing size={12} />
                    <Flex
                        as="ul"
                        css={css`
                            gap: 4px;
                        `}
                        justify="center"
                    >
                        {['월', '화', '수', '목', '금', '토', '일'].map(
                            (item, index) => {
                                return (
                                    <WeekList
                                        direction="column"
                                        align="center"
                                        css={css(`padding-top:6px;`)}
                                    >
                                        <Text typography="t0" color="gray500">
                                            {item}
                                        </Text>
                                        <Text typography="t1" color="gray800">
                                            {JSON.parse(
                                                weeklyReport.weeklyMood.replace(
                                                    /'/g,
                                                    '"',
                                                ),
                                            )[index] !== 'null'
                                                ? JSON.parse(
                                                      weeklyReport.weeklyMood.replace(
                                                          /'/g,
                                                          '"',
                                                      ),
                                                  )[index]
                                                : ''}
                                        </Text>
                                    </WeekList>
                                )
                            },
                        )}
                    </Flex>
                    <Spacing size={40} />
                    <AnalyzeTitle typography="t3" weight="bold" color="gray600">
                        추천 활동
                    </AnalyzeTitle>
                    <Spacing size={16} />
                    <WeekText justify="center">
                        <Text typography="t3" weight="bold" color="primary500">
                            {weeklyReport.recommendActivities}
                        </Text>
                    </WeekText>
                    <Spacing size={8} />
                    <Text typography="t1" color="gray500">
                        {weeklyReport.recommendReason}
                    </Text>
                    <Spacing size={32} />
                </Flex>
            </Flex>
            <Button type="button">
                <Text
                    typography="t2"
                    weight="bold"
                    color="white"
                    onClick={onClose}
                >
                    확인
                </Text>
            </Button>
        </>
    )
}

const AnalyzeTitle = styled(Text)`
    padding-left: 24px;
    background: url('/images/reportTitle.svg') no-repeat left center;
    background-size: 16px;
`

const WeekText = styled(Flex)`
    padding: 12px 0;
    background-color: var(--gray100);
    border-radius: 4px;
`
const WeekList = styled(Flex)`
    width: 44px;
    height: 46px;
    border: 1px solid var(--gray200);
    border-radius: 10px;
`

export default ReportAnalyze
