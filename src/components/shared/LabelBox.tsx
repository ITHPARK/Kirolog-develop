import React from 'react'
import styled from '@emotion/styled'

const LabelBox = ({
    children,
    htmlFor,
}: {
    children: React.ReactNode
    htmlFor: string
}) => {
    return <Label htmlFor={htmlFor}>{children}</Label>
}

const Label = styled.label`
    display: block;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    color: var(--gray700);
    line-height: 1.5;
    border-radius: 32px;
    background: var(--gray100);
    white-space: nowrap;
`

export default LabelBox
