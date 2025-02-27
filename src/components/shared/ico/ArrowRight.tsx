import { ReactComponent as ArrowLeftIcon } from "@assets/icons/arrow_left_24_24.svg"
import { css } from "@emotion/react"

const ArrowRight = () => {
    return (
        <div>
            <ArrowLeftIcon css={arrowReverse} width={24} height={24} />
        </div>
    )
}

const arrowReverse = css`
    transfrom: lotate(180deg);
`

export default ArrowRight
