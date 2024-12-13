import { Outlet, Route, Routes } from 'react-router-dom'

import AddDiaryAi from '@pages/AddDiaryAi'
import ArrowLeft from '@shared/ico/ArrowLeft'
import CalendartBox from '@components/calendar/CalendarBox'
import CalendartFeed from '@components/calendar/CalendarFeed'
import DiaryDetail from '@components/diary/DiaryDetail'
import Navbar from '@shared/Navbar'
import Redirection from '@pages/Redirection'
import SignIn from '@pages/SignIn'
import Signup from '@pages/Signup'
import styled from '@emotion/styled'

// Navbar를 포함하는 컴포넌트들과 아닌 컴포넌트 구분
const LayoutWithNavbar = () => (
    <>
        <Navbar />
        <Outlet />
    </>
)

const LayoutWithoutNavbar = () => <Outlet />

function App() {
    return (
        <>
            <Container>
                <Routes>
                    <Route path="/main/calendar" element={<CalendartBox />} />

                    <Route path="/main/diary" element={<CalendartFeed />} />

                    <Route path="/diary/:id" element={<DiaryDetail />} />

                    <Route path="/diary/write/my" element={<DiaryDetail />} />

                    <Route path="/diary/write/ai" element={<AddDiaryAi />} />

                    <Route path="/signin" element={<SignIn />} />

                    <Route path="/signup" element={<Signup />} />
                </Routes>
                {/* <ImageTest /> */}
            </Container>
            {/* <Navbar /> */}
        </>
    )
}

const Container = styled.div`
    padding: 0 20px;
`

export default App
