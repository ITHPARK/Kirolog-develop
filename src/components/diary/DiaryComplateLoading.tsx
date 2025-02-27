import FixedBottomButton from "@shared/FixedBottomButton"
import Flex from "@shared/Flex"
import React from "react"
import Spacing from "@shared/Spacing"
import Text from "@shared/Text"
import { createPortal } from "react-dom"
import styled from "@emotion/styled"
import { ReactComponent as AiDiaryComplateSplash } from "@assets/icons/AiDiaryComplateSplash.svg"
import { css } from "@emotion/react"
interface DiaryComplateLoadingProps {
    onClick: () => void // onClick을 props로 전달받기 위한 타입 정의
}

const DiaryComplateLoading: React.FC<DiaryComplateLoadingProps> = ({
    onClick,
}) => {
    const $portal = document.getElementById("splash")

    if ($portal == null) {
        return null
    }

    return createPortal(
        <>
            <SplashContainer>
                <SplashContent direction="column" align="center">
                    <AiDiaryComplateSplash width={176} height={184} />
                    <Text
                        typography="t4"
                        weight="bold"
                        color="gray800"
                        align="center"
                        css={css`
                            margin-top: 8px;
                        `}
                    >
                        오늘도 무사히 하루를
                        <br />
                        기록하셨군요!
                    </Text>
                    <Spacing size={12} />
                    <Text typography="t1" color="gray500" align="center">
                        꾸준함이 당신의 인생을 <br />
                        긍정적인 방향으로 변화시킬 수 있어요.
                    </Text>
                </SplashContent>
            </SplashContainer>
            <FixedBottomButton type="button" label="확인" onClick={onClick} />
        </>,
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

export default DiaryComplateLoading
