import React, { useEffect } from 'react'
import Flex from '@shared/Flex'
import styled from '@emotion/styled'
import useUserStore from '@/store/useUserStore'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import CalendarBox from '@components/calendar/CalendarBox'
import CalendarFeed from '@components/calendar/CalendarFeed'
import Test from '@components/Test'
import ImageTest from '@components/ImageTest'

import { useAlertContext } from '@context/AlertContext'

const HomePage = () => {
    const { user } = useUserStore()
    const { open } = useAlertContext()

    //alert창을 띄우기 위한 함수
    return (
        <div>
            {/* <TestContainer>
                <Link to="/signin">로그인</Link>
            </TestContainer> */}
            {/* <CalendarBox /> */}
            {/* <CalendarFeed /> */}
            {/* <Splash /> */}
            <ImageTest />
        </div>
    )
}

export default HomePage
