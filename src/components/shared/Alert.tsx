import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { colors } from '@styles/colorPalette'
import Dimmed from '@shared/Dimmed'
import Text from '@shared/Text'
import Flex from '@shared/Flex'
import Button from '@shared/Button'

interface AlertProps {
    open?: boolean
    Component?: React.ComponentType<any> | null
    buttonLabel1?: string
    buttonLabel2?: string
    onButtonClick1: () => void
    onButtonClick2?: () => void
    componentProps?: any // Component에 전달할 props
}

const Alert = ({
    open,
    Component,
    componentProps,
    buttonLabel1 = '확인',
    buttonLabel2 = '닫기',
    onButtonClick1,
    onButtonClick2,
}: AlertProps) => {
    if (open === false) {
        return null
    }

    return (
        <Dimmed>
            <AlertContiner>
                {Component != null && <Component {...componentProps} />}
                <Flex
                    justify="flex-end"
                    css={css`
                        gap: 8px;
                    `}
                >
                    {onButtonClick2 != null && (
                        <Button
                            typography="t2"
                            color="gray600"
                            bgColor="gray200"
                            weight="bold"
                            onClick={onButtonClick2}
                            css={css`
                                flex: 1;
                            `}
                        >
                            {buttonLabel2}
                        </Button>
                    )}

                    <Button
                        typography="t2"
                        color="white"
                        bgColor="gray800"
                        weight="bold"
                        onClick={onButtonClick1}
                        css={css`
                            flex: 1;
                        `}
                    >
                        {buttonLabel1}
                    </Button>
                </Flex>
            </AlertContiner>
        </Dimmed>
    )
}

const AlertContiner = styled.div`
    padding: 24px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: ${colors.white};
    border-radius: 8px;
    overflow: hidden;
    z-index: var-(--alert-zindex);
    box-sizing: border-box;
`

export default Alert
