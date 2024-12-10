import { css } from '@emotion/react'

//사용할 color를 미리 변수로 설정
export const colorPalette = css`
    :root {
        --red: #df5755;
        --white: #fff;
        --gray100: #f7f8fa;
        --gray200: #eaebed;
        --gray300: #cacdd2;
        --gray400: #9fa4a8;
        --gray500: #73787e;
        --gray600: #474c52;
        --gray700: #27282c;
        --gray800: #1c1d1f;
    }
`

export const colors = {
    white: 'var(--white)',
    red: 'var(--red)',
    gray100: 'var(--gray100)',
    gray200: 'var(--gray200)',
    gray300: 'var(--gray300)',
    gray400: 'var(--gray400)',
    gray500: 'var(--gray500)',
    gray600: 'var(--gray600)',
    gray700: 'var(--gray700)',
    gray800: 'var(--gray800)',
}

//color의 타입을 정의 키값만 사용하면 되기때문에 keyof 를 사용
export type Colors = keyof typeof colors
