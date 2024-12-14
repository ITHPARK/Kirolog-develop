import { Outlet, Route, Routes } from 'react-router-dom'

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
import My from '@pages/My'
import { useLocation } from 'react-router-dom'
import Privacy from '@pages/my/Privacy'
import TermsList from '@pages/my/TermsList'
import Nickname from '@pages/my/Nickname'
import Account from '@pages/my/Account'
import PrivateRoute from '@components/auth/PrivateRoute'
import TagCategory from '@components/diary/TagCategory'

// Navbar를 포함하는 컴포넌트들과 아닌 컴포넌트 구분
const LayoutWithNavbar = () => {
    const location = useLocation()
    const isMyPage = location.pathname === '/my'

    return (
        <>
            <Container className={isMyPage ? 'no-padding' : ''}>
                <Outlet />
            </Container>
            <Navbar />
        </>
    )
}

const LayoutWithoutNavbar = () => (
    <Container>
        <Outlet />
    </Container>
)

function App() {
    return (
        <>
            <Routes>
                {/* LayoutWithNavbar 경로 */}
                <Route element={<LayoutWithNavbar />}>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <CalendartBox />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/diary"
                        element={
                            <PrivateRoute>
                                <CalendartFeed />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/my"
                        element={
                            <PrivateRoute>
                                <My />
                            </PrivateRoute>
                        }
                    />
                </Route>

                {/* LayoutWithoutNavbar 경로 */}
                <Route element={<LayoutWithoutNavbar />}>
                    <Route
                        path="/my/account"
                        element={
                            <PrivateRoute>
                                <Account />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/my/nickname"
                        element={
                            <PrivateRoute>
                                <Nickname />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/my/privacy"
                        element={
                            <PrivateRoute>
                                <Privacy />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/my/terms"
                        element={
                            <PrivateRoute>
                                <TermsList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/report"
                        element={
                            <PrivateRoute>
                                <DiaryDetail />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/diary/:id"
                        element={
                            <PrivateRoute>
                                <DiaryDetail />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/diary/write/my"
                        element={
                            <PrivateRoute>
                                <AddDiaryMy />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/diary/write/ai"
                        element={
                            <PrivateRoute>
                                <AddDiaryAi />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
            </Routes>
            {/* <TagCategory /> */}
        </>
    )
}

const Container = styled.div`
    padding: 0 20px 20px;

    &.no-padding {
        padding: 0;
    }
`

export default App
