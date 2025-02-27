import React from "react"
import { css } from "@emotion/react"
import { ReactComponent as ArrowBottom } from "@assets/icons/arrow_bottom.svg"

const ArrowDown = () => {
    return <ArrowBottom css={arrowPos} width={14} height={7} />
}

const arrowPos = css`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
`

export default ArrowDown
