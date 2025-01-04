import React, { useState, forwardRef, InputHTMLAttributes } from "react"
import { css } from "@emotion/react"
import { typographyMap, typographyWeight } from "@styles/typography"
import { Colors, colors } from "@styles/colorPalette"

const Input = forwardRef<
    //input 엘리먼트를 나타내는 DOM 타입
    HTMLInputElement,
    //input 엘리먼트의 속성들을 타입으로 포함하는 React의 타입 (input에 대하여 리액트에서 제공하는 속성들을 쓸 수 있다.)
    InputHTMLAttributes<HTMLInputElement> & { bgColor?: Colors }
>((props, ref) => {
    const { bgColor, onChange, ...rest } = props // onChange를 분리하고 나머지 props를 rest로 저장
    const [value, setValue] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        // 외부에서 전달된 onChange가 있으면 호출
        if (onChange) {
            onChange(e)
        }
    }

    return (
        <input
            ref={ref}
            {...rest} // 나머지 props를 input에 전달
            css={inputStyles(value, bgColor)} // bgColor를 전달
            onChange={handleChange} // handleChange로 이벤트 처리
        />
    )
})

const inputStyles = (value: string, bgColor?: Colors) => css`
    padding: 11px 12px;
    width: 100%;
    height: 100%;
    display: block;
    background-color: ${bgColor
        ? colors[bgColor]
        : colors[
              "white"
          ]}; // bgColor가 있으면 colors에서 해당 색을 가져오고, 없으면 기본값 white
    border: 1px solid var(--gray200);
    border-radius: 8px;
    ${typographyMap["t2"]}
    ${typographyWeight["medium"]}
  color: var(--gray600);

    ::placeholder {
        color: var(--gray300);
    }

    /* 값이 있을 때 테두리 색상 변경 */
    border-color: ${value ? "black" : "var(--gray200)"};
    &:focus {
        border-color: var(--gray800);
        outline: none;
    }
`

export default Input
