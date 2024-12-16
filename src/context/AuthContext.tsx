import React, {
    createContext,
    useContext,
    useEffect,
    useCallback,
    useState,
    useRef,
} from 'react'
import { getUser, refreshToken } from '@remote/user'
import { useQuery } from '@tanstack/react-query'
import useUserStore from '@/store/useUserStore'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const tokenRefreshing = useRef(false) // useRef로 선언

    const { user, setUser } = useUserStore()
    const navigate = useNavigate()

    const logout = useCallback(() => {
        localStorage.removeItem('accessToken') // 토큰 삭제
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('username')
        setUser(null)
        navigate('/signin') // 로그아웃 후 로그인 페이지로 이동
    }, [])

    const refreshTokenValue = localStorage.getItem('refreshToken')

    // 사용자 데이터 가져오기 (토큰이 있는 경우)
    // const { data, isLoading, refetch, isError } = useQuery({
    //     queryKey: ['user', localStorage.getItem('username')],
    //     queryFn: () =>
    //         getUser(
    //             localStorage.getItem('username') as string,
    //             localStorage.getItem('accessToken') as string, // 최신 토큰을 사용
    //         ),
    //     enabled: !!localStorage.getItem('accessToken'), // token이 있을 때만 쿼리 실행
    //     retry: false, // 토큰 만료 시 재시도하지 않도록 설정
    // })

    // useEffect(() => {
    //     if (isError && refreshTokenValue && !tokenRefreshing.current) {
    //         tokenRefreshing.current = true // 중복 실행 방지 플래그 설정

    //         refreshToken(refreshTokenValue)
    //             .then((refreshedToken) => {
    //                 localStorage.setItem('accessToken', refreshedToken.access) // 새 액세스 토큰 저장

    //                 refetch() // 데이터 재요청
    //             })
    //             .catch((e) => {
    //                 console.error('리프레시 토큰 갱신 실패:', e)
    //                 // logout() // 리프레시 토큰 만료 시 로그아웃
    //             })
    //             .finally(() => {
    //                 tokenRefreshing.current = false // 플래그 초기화
    //             })
    //     }
    // }, [isError, refreshTokenValue]) // 필요한 의존성만 추가

    // useEffect(() => {
    //     if (data) {
    //         console.log(data)
    //         setUser({
    //             username: localStorage.getItem('username') || '',
    //             nickname: data.nickname,
    //             profilePicture: data.profilePicture || '',
    //             interests: data.interests || [],
    //             personalities: data.personalities || '',
    //         })
    //     }
    // }, [data]) // data가 바뀔 때마다 실행

    // useEffect(() => {
    //     if (user?.interests?.length === 0 && user?.personalities?.length == 0) {
    //         navigate('/onboarding')
    //     }
    // }, [user])

    // if (isLoading) {
    //     return <div>유저 데이터를 가져오는 중입니다.</div>
    // }

    return (
        <AuthContext.Provider value={{ logout }}>
            {children} {/* 자식 컴포넌트들이 이 값들을 사용할 수 있도록 */}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth는 AuthContext 내부에서만 사용할 수 있습니다.')
    }
    return context
}
