import { css } from '@emotion/react'

export const typographyMap = {
    t0: css`
        font-size: 10px;
        line-height: 1.5;
    `,
    t1: css`
        font-size: 12px;
        line-height: 1.5;
    `,
    t2: css`
        font-size: 14px;
        line-height: 1.5;
    `,
    t3: css`
        font-size: 16px;
        line-height: 1.5;
    `,
    t4: css`
        font-size: 20px;
        line-height: 1.5;
    `,
    t5: css`
        font-size: 24px;
        line-height: 1.5;
    `,
    t6: css`
        font-size: 26px;
        line-height: 1.5;
    `,
}

export const typographyWeight = {
    bold: css`
        font-weight: 700;
    `,
    semiBold: css`
        font-weight: 600;
    `,
    medium: css`
        font-weight: 500;
    `,
    regular: css`
        font-weight: 400;
    `,
}

//type Typography = "t1" | "t2" | "t3" | "t4" | "t5" | "t6" | "t7"
//위와 같이 키만  추출하여 유니온 타입으로 만든다.
//키들 중 하나를 선택하도록 강제
export type Typography = keyof typeof typographyMap
export type TypographyWeight = keyof typeof typographyWeight
