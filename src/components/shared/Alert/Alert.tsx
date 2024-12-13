import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { css } from '@emotion/react'

const Alert = ({
    title,
    description,
}: {
    title?: string
    description?: string
}) => {
    return (
        <Flex
            direction="column"
            css={css`
                height: 78px;
            `}
        >
            {title && (
                <Text
                    typography="t3"
                    weight="bold"
                    color="gray800"
                    align="center"
                >
                    {title}
                </Text>
            )}
            {description && (
                <Text
                    typography="t1"
                    color="gray500"
                    align="center"
                    css={css`
                        white-space: pre-line;
                    `}
                >
                    {description}
                </Text>
            )}
        </Flex>
    )
}

export default Alert
