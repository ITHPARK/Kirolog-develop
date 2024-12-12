import React from 'react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import styled from '@emotion/styled'
import { createPortal } from 'react-dom'

const AiDiaryCreateLoading = () => {
    const $portal = document.getElementById('splash')

    if ($portal == null) {
        return null
    }

    return createPortal(
        <SplashContainer>
            <SplashContent direction="column" align="center">
                <Text typography="t4" weight="bold" color="gray800">
                    잠시만 기다려주세요!
                </Text>
                <Spacing size={12} />
                <Text typography="t1" color="gray500">
                    AI 일기 생성 중입니다.
                </Text>
            </SplashContent>
        </SplashContainer>,
        $portal,
    )
}

const SplashContainer = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
`

const SplashContent = styled(Flex)`
    padding-top: 192px;
    margin-top: 182px;
    background: url(/images/character/AiDiaryCreateSplash.png) no-repeat center
        top;
    background-size: 176px 184px;
`

export default AiDiaryCreateLoading
