import React, { useState, forwardRef, InputHTMLAttributes } from 'react'
import { css } from '@emotion/react'
import { typographyMap, typographyWeight } from '@styles/typography'

// forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>
//HTMLInputElement는 Input이 DOM 요소의 input임을 나타냄
//InputHTMLAttributes<HTMLInputElement>는 input에서 사용하는 모든 속성들의 타입을나타냄
const Input = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
    const [value, setValue] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return (
        <input
            ref={ref}
            {...props}
            css={inputStyles(value)}
            onChange={handleChange}
        />
    )
})

const inputStyles = (value: string) => css`
    padding: 11px 12px;
    width: 100%;
    height: 100%;
    display: block;
    border: 1px solid var(--gray200);
    border-radius: 8px;
    ${typographyMap['t2']}
    ${typographyWeight['medium']}
    color: var(--gray600);

    ::placeholder {
        color: var(--gray300);
    }

    /* 값이 있을 때 테두리 색상 변경 */
    border-color: ${value ? 'black' : 'var(--gray200)'};
    &:focus {
        border-color: var(--gray800);
        outline: none;
    }
`

export default Input
