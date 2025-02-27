import { ReactComponent as ArrowLeftIcon } from "@assets/icons/arrow_left_24_24.svg"
import { css } from "@emotion/react"

const ArrowRight = () => {
    return <ArrowLeftIcon css={arrowReverse} width={24} height={24} />
}

const arrowReverse = css`
    transfrom: lotate(180deg);
`

export default ArrowRight
