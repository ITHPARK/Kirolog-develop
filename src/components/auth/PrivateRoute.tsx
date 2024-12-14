import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    //로그인 정보가 없으면 로그인 페이지로 이동
    if (localStorage.getItem('accessToken') == null) {
        //replace를 true로 하면 뒤로가기 이동이 불가능
        return <Navigate to="/signin" replace={true} />
    }

    return <>{children}</>
}
export default PrivateRoute
