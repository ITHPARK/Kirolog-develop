import React, { useEffect } from 'react'
import Flex from '@shared/Flex'
import styled from '@emotion/styled'
import useUserStore from '@/store/useUserStore'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import CalendarBox from '@components/calendar/CalendarBox'
import CalendarFeed from '@components/calendar/CalendarFeed'
import Splash from '@components/Splash'

const HomePage = () => {
    const { user } = useUserStore()
    return (
        <div>
            {/* <TestContainer>
                <Link to="/signin">로그인</Link>
            </TestContainer> */}
            <CalendarBox />
            {/* <CalendarFeed /> */}
            {/* <Splash /> */}
        </div>
    )
}

export default HomePage
