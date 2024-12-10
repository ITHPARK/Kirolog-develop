import React from 'react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const Splash = () => {
    return (
        <SplashContainer>
            <Flex direction="column" justify="center" align="center">
                <img
                    src="/images/character/character.svg"
                    alt="캐릭터 이미지"
                    css={imageStyles}
                />
                <Flex direction="column" align="center">
                    <Text typography="t5" color="white" weight="bold">
                        기록하는 순간
                    </Text>
                    <Text typography="t4" color="white" weight="bold">
                        나를 찾아가는 여정
                    </Text>
                </Flex>
            </Flex>
        </SplashContainer>
    )
}
const SplashContainer = styled(Flex)`
    width: 100%;
    position: fixed;
    left: 0;
    right 0;
    top: 0;
    bottom: 0;
    background-color: #9F97FC; 
`

const imageStyles = css`
    width: 148px;
    height: 187px;
`

export default Splash
