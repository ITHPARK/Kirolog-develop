import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'

import { useLocation } from 'react-router-dom'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { useNavigate } from 'react-router-dom'

const Topbar = () => {
    //현재 경로를 가져온다.
    const location = useLocation()

    //경로이동을 위한 훅
    const navigate = useNavigate()

    const renderTitle = () => {
        if (location.pathname === '/signin') {
            return <Text align="center">기로록</Text>
        } else if (location.pathname === '/signup') {
            return (
                <Text typography="t3" weight="bold" align="center">
                    회원가입
                </Text>
            )
        }
    }

    return (
        <Flex css={TopbarStyles} justify="center" align="center">
            <button onClick={() => navigate(-1)} css={BackButtonStyles}>
                뒤로
            </button>
            {renderTitle()}
        </Flex>
    )
}

const TopbarStyles = css`
    width: 100%;
    height: 50px;
    position: relative;
    border-bottom: 1px solid var(--gray100);
`

const BackButtonStyles = css`
    color: red;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
`

export default Topbar
