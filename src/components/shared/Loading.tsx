import { createPortal } from "react-dom"
import Flex from "@shared/Flex"
import Text from "@shared/Text"
import styled from "@emotion/styled"
import { css, keyframes } from "@emotion/react"

const Loading = () => {
    const $portal = document.getElementById("loading")

    if ($portal == null) {
        return null
    }

    return createPortal(
        <LoadingConatiner>
            <Flex direction="column" css={LoadingInnerStyle}>
                <Flex
                    justify="center"
                    css={css`
                        gap: 8px;
                    `}
                >
                    <LoadingBullet
                        css={[
                            css`
                                animation-delay: 0s;
                            `,
                        ]}
                    />
                    <LoadingBullet
                        css={[
                            css`
                                animation-delay: 0.5s;
                            `,
                        ]}
                    />
                    <LoadingBullet
                        css={[
                            css`
                                animation-delay: 0.8s;
                            `,
                        ]}
                    />
                </Flex>
                <Flex direction="column" justify="center">
                    <Text
                        typography="t4"
                        weight="bold"
                        color="gray800"
                        align="center"
                    >
                        로딩중입니다!
                    </Text>
                    <Text typography="t1" color="gray500" align="center">
                        잠시만 기다려주세요
                    </Text>
                </Flex>
            </Flex>
        </LoadingConatiner>,
        $portal,
    )
}

const growShrink = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
`

const LoadingConatiner = styled(Flex)`
    display: flex;
    justify-content: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
`
const LoadingInnerStyle = css`
    margin-top: 335px;
    gap: 50px;
`

const LoadingBullet = styled.span`
    width: 8px;
    height: 8px;
    display: inline-block;
    background-color: var(--primary300);
    border-radius: 50%;
    animation: ${growShrink} 1.5s infinite ease-in-out;
`

export default Loading
