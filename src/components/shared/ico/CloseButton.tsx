import styled from "@emotion/styled"
import { ReactComponent as Close24 } from "@assets/icons/close_24.svg"

const CloseButton = () => {
    return (
        <ArrowLeft>
            <Close24 />
        </ArrowLeft>
    )
}

const ArrowLeft = styled.div`
    width: 24px;
    height: 24px;
`

export default CloseButton
