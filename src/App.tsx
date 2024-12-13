import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'

import AddDiaryAi from '@pages/AddDiaryAi'
import AddDiaryMy from '@pages/AddDiaryMy'
import CalendartBox from '@components/calendar/CalendarBox'
import CalendartFeed from '@components/calendar/CalendarFeed'
import DiaryDetail from '@components/diary/DiaryDetail'
import Navbar from '@shared/Navbar'
import Redirection from '@pages/Redirection'
import SignIn from '@pages/SignIn'
import Signup from '@pages/Signup'
import styled from '@emotion/styled'
import { useEffect } from 'react'

// Navbar를 포함하는 컴포넌트들과 아닌 컴포넌트 구분
const LayoutWithNavbar = ({}) => (
    <>
        <Outlet />
        <Navbar />
    </>
)

const LayoutWithoutNavbar = () => <Outlet />

function App() {
    return (
        <Container>
            <Routes>
                <Route element={<LayoutWithNavbar />}>
                    <Route path="/" element={<CalendartBox />} />
                    <Route path="/diary" element={<CalendartFeed />} />
                </Route>

                <Route element={<LayoutWithoutNavbar />}>
                    <Route path="report" element={<DiaryDetail />} />
                    <Route path="/diary/:id" element={<DiaryDetail />} />
                    <Route path="/diary/write/my" element={<AddDiaryMy />} />
                    <Route path="/diary/write/ai" element={<AddDiaryAi />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
            </Routes>
        </Container>
    )
}

const Container = styled.div`
    padding: 0 20px 20px;
`

export default App
