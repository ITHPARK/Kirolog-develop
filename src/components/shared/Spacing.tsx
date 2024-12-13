import styled from '@emotion/styled'
import { Colors, colors } from '@/styles/colorPalette'

interface SpacingProps {
    size: number
    direction?: 'vertical' | 'horizontal'
    color?: Colors
}

const Spacing = styled.div<SpacingProps>`
    ${({ size, direction = 'vertical', color }) => `
    ${direction === 'vertical' ? `height: ${size}px;` : `width: ${size}px;`}
    ${color ? `background-color: ${colors[color]}` : `background-color: transparent`} 
  `}
`

export default Spacing
