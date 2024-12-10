import { CSSProperties } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { colors, Colors } from '@styles/colorPalette'
import {
    Typography,
    typographyMap,
    typographyWeight,
    TypographyWeight,
} from '@/styles/typography'

interface ButtonProps {
    full?: boolean
    color?: Colors
    bgColor?: Colors
    typography?: Typography
    weight?: TypographyWeight
}

const Button = styled.button<ButtonProps>(
    ({ full, color = 'gray800', bgColor = 'gray800' }) => ({
        width: full ? `100%` : '',
        backgroundColor: colors[bgColor],
        color: colors[color],
        textAlign: 'center',
        padding: '11px 27px',
        borderRadius: '8px',
    }),
    ({ typography = 't3' }) => typographyMap[typography],
    ({ weight = 'bold' }) => typographyWeight[weight],
)

export default Button
