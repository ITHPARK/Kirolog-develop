import Flex from '@shared/Flex'
import React from 'react'
import Text from '@shared/Text'
import { createPortal } from 'react-dom'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface TopProps {
    left?: React.ReactNode
    leftOnClick?: () => void
    title: string
    right?: React.ReactNode
    rightOnClick?: () => void
}

const Topbar = ({
    left,
    leftOnClick,
    title,
    right,
    rightOnClick,
}: TopProps) => {
    const $portal = document.getElementById('topbar')

    if ($portal == null) {
        return null
    }

    return createPortal(
        <TopbarStyles css={TopbarStyles} justify="spaceBetween" align="center">
            {left != null && (
                <button onClick={leftOnClick} css={leftButtonStyles}>
                    {left}
                </button>
            )}
            <Text
                typography="t3"
                weight="bold"
                color="gray800"
                align="center"
                css={css`
                    flex: 1;
                `}
            >
                {title}
            </Text>
            {right != null && (
                <button onClick={rightOnClick} css={rightButtonStyles}>
                    {right}
                </button>
            )}
        </TopbarStyles>,
        $portal,
    )
}

const TopbarStyles = styled(Flex)`
    width: 100%;
    height: 50px;
    position: relative;
    border-bottom: 1px solid var(--gray100);
`

const leftButtonStyles = css`
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
`
const rightButtonStyles = css`
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
`

export default Topbar
