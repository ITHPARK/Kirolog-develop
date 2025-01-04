import Flex from "@shared/Flex"
import Spacing from "@shared/Spacing"
import Text from "@shared/Text"
import { createPortal } from "react-dom"
import styled from "@emotion/styled"

const MyDiaryCreateLoading = () => {
    const $portal = document.getElementById("splash")

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
    padding-top: 192px;
    margin-top: 182px;
    background: url(/images/character/AiDiaryCreateSplash.png) no-repeat center
        top;
    background-size: 176px 184px;
`

export default MyDiaryCreateLoading
