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
    disabled?: boolean
}

const Button = styled.button<ButtonProps>(
    ({ full, color = 'gray800', bgColor = 'gray800', disabled }) => ({
        width: full ? `100%` : '',
        backgroundColor: disabled ? colors['gray200'] : colors[bgColor],
        color: disabled ? colors['gray300'] : colors[color],
        textAlign: 'center',
        padding: '11px 27px',
        borderRadius: '8px',
    }),
    ({ typography = 't3' }) => typographyMap[typography],
    ({ weight = 'bold' }) => typographyWeight[weight],
)

export default Button
