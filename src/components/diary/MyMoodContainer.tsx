import Flex from '@shared/Flex'
import React from 'react'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const MyMoodContainer = ({ mood }: { mood: string }) => {
    return (
        <MoodContainer justify="space-between">
            <Text typography="t2" color="gray800">
                오늘 당신의 감정은
            </Text>
            <Text typography="t2" color="gray800" weight="bold">
                {mood}
            </Text>
        </MoodContainer>
    )
}

const MoodContainer = styled(Flex)`
    padding: 16px 30px 16px 20px;
    width: 100%;
    background: var(--gray100);
    border-radius: 8px;
`

export default MyMoodContainer
