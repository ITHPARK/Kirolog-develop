import React, { useState, useEffect } from 'react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import styled from '@emotion/styled'
import useUserStore from '@/store/useUserStore'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import CalendarBox from '@components/calendar/CalendarBox'
import CalendarFeed from '@components/calendar/CalendarFeed'

import { useAlertContext } from '@context/AlertContext'

const HomePage = () => {
    const [tabState, setTabState] = useState<boolean>(false)

    const handleClickTab = () => {
        setTabState((prev: boolean) => !prev)
    }

    //alert창을 띄우기 위한 함수
    return (
        <div>
            <TabContainer as="ul">
                <li>
                    <button
                        onClick={handleClickTab}
                        css={!tabState && activeButtonStyles}
                    >
                        캘린더
                    </button>
                </li>
                <li>
                    <button
                        onClick={handleClickTab}
                        css={tabState && activeButtonStyles}
                    >
                        포스트
                    </button>
                </li>
            </TabContainer>

            <div>{!tabState ? <CalendarBox /> : <CalendarFeed />}</div>
        </div>
    )
}

const TabContainer = styled(Flex)`
    padding: 5px;
    margin-top: 20px;
    margin-bottom: 24px;
    width: 100%;
    gap: 5px;
    background-color: var(--gray100);
    border-radius: 6px;

    li {
        flex: 1;

        button {
            padding: 10px 0;
            width: 100%;
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: var(--slate700);
            text-align: center;
            border-radius: 3px;
        }
    }
`

const activeButtonStyles = css`
    background-color: var(--white);
`

export default HomePage
