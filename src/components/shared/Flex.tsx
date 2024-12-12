import React, { CSSProperties } from 'react'

import styled from '@emotion/styled'

interface FlexProps {
    as?: string
    direction?: CSSProperties['flexDirection']
    justify?: CSSProperties['justifyContent']
    align?: CSSProperties['alignItems']
}

const Flex = styled.div<FlexProps>(({ direction, justify, align }) => ({
    display: 'flex',
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    width: '100%',
}))

export default Flex
