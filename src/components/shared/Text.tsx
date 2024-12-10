import { CSSProperties } from 'react'
import styled from '@emotion/styled'

import {
    Typography,
    typographyMap,
    typographyWeight,
    TypographyWeight,
} from '@/styles/typography'
import { colors, Colors } from '@styles/colorPalette'

interface TextProps {
    color?: Colors
    typography?: Typography
    display?: CSSProperties['display']
    align?: CSSProperties['textAlign']
    weight?: TypographyWeight
}

const Text = styled.p<TextProps>(
    ({ display, align, color = 'gray800' }) => ({
        color: colors[color],
        display: display,
        textAlign: align,
    }),
    ({ typography = 't4' }) => typographyMap[typography],
    ({ weight = 'medium' }) => typographyWeight[weight],
)

export default Text
