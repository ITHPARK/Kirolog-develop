import Flex from '@shared/Flex'
import React from 'react'
import Text from '@shared/Text'

const Alert = ({
    title,
    description,
}: {
    title?: string
    description?: string
}) => {
    return (
        <Flex direction="column">
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
                <Text typography="t1" color="gray500" align="center">
                    {description}
                </Text>
            )}
        </Flex>
    )
}

export default Alert
