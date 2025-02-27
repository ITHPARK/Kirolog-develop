import Flex from "@shared/Flex"
import Spacing from "@shared/Spacing"
import Text from "@shared/Text"
import { createPortal } from "react-dom"
import styled from "@emotion/styled"
import { ReactComponent as AiDiaryCreateSplash } from "@assets/icons/AiDiaryCreateSplash.svg"
import { css } from "@emotion/react"

const MyDiaryCreateLoading = () => {
    const $portal = document.getElementById("splash")

    if ($portal == null) {
        return null
    }

    return createPortal(
        <SplashContainer>
            <SplashContent direction="column" align="center">
                <AiDiaryCreateSplash width={176} height={184} />
                <Text
                    typography="t4"
                    weight="bold"
                    color="gray800"
                    css={css`
                        margin-top: 8px;
                    `}
                >
                    잠시만 기다려주세요!
                </Text>
                <Spacing size={12} />
                <Text typography="t1" color="gray500">
                    일기 저장 중입니다.
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
    margin-top: 182px;
`

export default MyDiaryCreateLoading
