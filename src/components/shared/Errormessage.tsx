import Text from '@shared/Text'
import { css } from '@emotion/react'

const Errormessage = ({ message }: { message?: string }) => {
    return (
        <>
            <Text
                typography="t1"
                color="red"
                align="left"
                css={css`
                    padding-left: 10px;
                    margin-top: 8px;
                    width: 100%;
                `}
            >
                {message}
            </Text>
        </>
    )
}

export default Errormessage
