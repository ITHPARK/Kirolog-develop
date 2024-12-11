import { Routes, Route, Outlet } from 'react-router-dom'
import HomePage from '@pages/HomePage'
import SignIn from '@pages/SignIn'
import Redirection from '@pages/Redirection'
import Navbar from '@shared/Navbar'
import styled from '@emotion/styled'
import Signup from '@pages/Signup'
import CalendarPicker from '@components/calendar/CalendarPicker'
import DiaryDetail from '@components/diary/DiaryDetail'

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
                    <Route path="/main" element={<HomePage />}></Route>
                    <Route path="/diary/:id" element={<DiaryDetail />}></Route>

                    <Route path="/signin" element={<SignIn />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
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
