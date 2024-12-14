import React from 'react'
import Text from '@shared/Text'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Button from '@shared/Button'

const ReportAnalyze = ({ onClose }: { onClose: () => void }) => {
    return (
        <>
            <Flex direction="column">
                <Text typography="t2" weight="semiBold" color="gray500">
                    2024년 12월 셋째 주
                </Text>
                <Spacing size={30} />
                <Flex direction="column">
                    <AnalyzeTitle typography="t3" weight="bold" color="gray600">
                        이번주 감정 분석
                    </AnalyzeTitle>
                    <Spacing size={16} />
                    <WeekText justify="center">
                        <Text typography="t3" weight="bold" color="primary500">
                            긍정의 한주를 보낸 당신, 대단해요!
                        </Text>
                    </WeekText>
                    <Spacing size={12} />
                    <Flex direction="column">
                        <Text typography="t1" color="gray500">
                            크고 작은 기쁨들이 있으셨군요!
                        </Text>
                        <Text typography="t1" color="gray500">
                            앞으로도 좋은 일들이 가득하길 바랍니다.
                        </Text>
                    </Flex>
                    <Spacing size={12} />
                    <Flex
                        as="ul"
                        css={css`
                            gap: 4px;
                        `}
                    >
                        <WeekList
                            direction="column"
                            align="center"
                            justify="center"
                        >
                            <Text typography="t0" color="gray500">
                                월
                            </Text>
                            <Text typography="t2" color="gray800">
                                기쁨
                            </Text>
                        </WeekList>
                        <WeekList
                            direction="column"
                            align="center"
                            justify="center"
                        >
                            <Text typography="t0" color="gray500">
                                월
                            </Text>
                            <Text typography="t2" color="gray800">
                                기쁨
                            </Text>
                        </WeekList>
                        <WeekList
                            direction="column"
                            align="center"
                            justify="center"
                        >
                            <Text typography="t0" color="gray500">
                                월
                            </Text>
                            <Text typography="t2" color="gray800">
                                기쁨
                            </Text>
                        </WeekList>
                    </Flex>
                    <Spacing size={40} />
                    <AnalyzeTitle typography="t3" weight="bold" color="gray600">
                        추천 활동
                    </AnalyzeTitle>
                    <Spacing size={16} />
                    <WeekText justify="center">
                        <Text typography="t3" weight="bold" color="primary500">
                            긍정의 한주를 보낸 당신, 대단해요!
                        </Text>
                    </WeekText>
                    <Spacing size={8} />
                    <Text typography="t1" color="gray500">
                        신중한 성격을 고려해 천천히 운동을 하며 몸을 풀어주면
                        좋습니다. 그리고 회복 후 건강한 식사를 위한 요리
                        클래스에 참여해 보거나, 건강식을 만드는 레시피를
                        찾아보는 것도 좋은 방법이에요. by 로기
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
