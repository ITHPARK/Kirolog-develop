import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import HomePage from '@pages/HomePage'
import SignIn from '@pages/SignIn'
import Redirection from '@pages/Redirection'
import Navbar from '@shared/Navbar'
import Topbar from '@shared/Topbar'
import styled from '@emotion/styled'
import Signup from '@pages/Signup'
import ImageTest from '@components/ImageTest'

// Navbar를 포함하는 컴포넌트들과 아닌 컴포넌트 구분
const LayoutWithNavbar = () => (
    <>
        <Navbar />
        <Outlet />
    </>
)

const LayoutWithoutNavbar = () => <Outlet />

function App() {
    const location = useLocation()

    // 특정 페이지에서는 TopBar를 렌더링하지 않음
    const showTopBar = !['/'].includes(location.pathname)

    return (
        <>
            <Container>
                <Routes>
                    <Route path="/main" element={<HomePage />}></Route>
                    <Route path="/signin" element={<SignIn />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    {/* <Route
                        path="/kakao/callback"
                        element={<Redirection />}
                    ></Route> */}
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
