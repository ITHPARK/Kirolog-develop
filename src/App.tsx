import { Outlet, Route, Routes } from "react-router-dom"

import AddDiaryAi from "@pages/AddDiaryAi"
import AddDiaryMy from "@pages/AddDiaryMy"
import DiaryDetail from "@components/diary/DiaryDetail"
import Navbar from "@shared/Navbar"
import CalendarContent from "@pages/CalendarContent"

import SignIn from "@pages/SignIn"
import Signup from "@pages/Signup"
import styled from "@emotion/styled"
import My from "@pages/My"
import { useLocation } from "react-router-dom"
import Privacy from "@pages/my/Privacy"
import TermsList from "@pages/my/TermsList"
import Nickname from "@pages/my/Nickname"
import Account from "@pages/my/Account"
import PrivateRoute from "@components/auth/PrivateRoute"

import Report from "@pages/Report"
import Tutorial from "@pages/Tutorial"
import Interest from "@pages/Interest"
import Loading from "@shared/Loading"

// Navbar를 포함하는 컴포넌트들과 아닌 컴포넌트 구분
const LayoutWithNavbar = () => {
    const location = useLocation()
    const isMyPage = location.pathname === "/my"
    const isReportPage = location.pathname === "/report"
    const isOnboardingPage = location.pathname === "/onboarding"

    return (
        <>
            <Container
                className={
                    isMyPage || isReportPage || isOnboardingPage
                        ? "no-padding"
                        : ""
                }
            >
                <Outlet />
            </Container>
            <Navbar />
        </>
    )
}

const LayoutWithoutNavbar = () => {
    const location = useLocation()
    const isOnboardingPage = location.pathname === "/onboarding"
    return (
        <Container className={isOnboardingPage ? "no-padding" : ""}>
            <Outlet />
        </Container>
    )
}

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
                                <CalendarContent />
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
                    <Route
                        path="/report"
                        element={
                            // <PrivateRoute>
                            <Report />
                            // </PrivateRoute>
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
                    <Route
                        path="/onboarding"
                        element={
                            <PrivateRoute>
                                <Tutorial />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/interest"
                        element={
                            <PrivateRoute>
                                <Interest />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
            </Routes>
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
