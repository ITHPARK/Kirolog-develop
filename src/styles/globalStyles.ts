import { colorPalette } from "./colorPalette"
import { css } from "@emotion/react"

export default css`
    :root {
        --dimmed-zindex: 10;
        --alert-zindex: 11;
    }
    ${colorPalette} // 색상을 추가
    

    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video,
    input ,
    textarea {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        box-sizing: border-box;
        font-family:
            "Pretendard Variable",
            Pretendard,
            -apple-system,
            BlinkMacSystemFont,
            system-ui,
            Roboto,
            "Helvetica Neue",
            "Segoe UI",
            "Apple SD Gothic Neo",
            "Noto Sans KR",
            "Malgun Gothic",
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol",
            sans-serif;
    }
    /* HTML5 display-role reset for older browsers */
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol,
    ul {
        list-style: none;
    }
    blockquote,
    q {
        quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
        content: "";
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    button {
        border: none;
        margin: 0;
        padding: 0;
        width: auto;
        overflow: visible;

        background: transparent;

        color: inherit;
        font: inherit;

        line-height: normal;

        -webkit-font-smoothing: inherit;
        -moz-osx-font-smoothing: inherit;

        -webkit-appearance: none;
    }

    input {
        outline: none;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    html {
        height: 100%;
    }

    #root {
        position: relative;
        padding-bottom: 20px;
        height: calc(100vh - 60px);
        overflow-y: auto;
        flex: 1;
    }

    img {
        width: 100%;
        height: 100%;
    }

    input[type="radio"],
    input[type="checkbox"] {
        display: none;
    }

    body {
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
        width: 100%;
    }

    #bottomButton {
        z-index: 1001;
    }

    #modal-portal {
        z-index: 1002;
    }

    .custom-pagination .swiper-pagination-bullet {
        position: relative;
        left: 0;
        width: 8px;
        height: 8px;
        background-color: #dddfe4;
    }

    .custom-pagination
        .swiper-pagination-bullet.swiper-pagination-bullet-active {
        width: 23px;
        height: 8px;
        background-color: var(--gray500);
        border-radius: 100px;
    }

    .swiper-slide {
        padding: 0 25px;
    }

    .agree-list {
        padding-left: 15px;
        position: relative;
        font-size: 10px;
        font-weight: 500;
        color: var(--gray500);
        line-height: 1.5;

        &::after {
            content: "";
            display: block;
            width: 2px;
            height: 2px;
            position: absolute;
            left: 6px;
            top: 7px;
            background: var(--gray500);
            border-radius: 50%;
        }
    }

    .agree-list-caption {
        display: block;
        font-size: 10px;
        font-weight: 500;
        color: var(--gray500);
    }
`
