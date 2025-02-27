import React, { createContext, useCallback, useContext, useEffect } from "react"
import { deleteCookie, getCookie } from "@utils/cookieController"
import { getUser } from "@remote/user"
import { useQueryClient } from "@tanstack/react-query"
import { useCalendar } from "@store/useCalendar"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import useUserStore from "@/store/useUserStore"
import Loading from "@shared/Loading"

interface AuthContextType {
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useQueryClient()
    const { user, setUser } = useUserStore()
    const { setTab, setViewDate, setDiaryDate } = useCalendar()
    const navigate = useNavigate()

    const logout = useCallback(() => {
        deleteCookie("accessToken") // 토큰 삭제
        deleteCookie("refreshToken")
        deleteCookie("username")
        setUser(null)
        setTab(1)
        setViewDate(new Date())
        setDiaryDate(new Date())
        navigate("/signin") // 로그아웃 후 로그인 페이지로 이동
        queryClient.resetQueries({ queryKey: ["diary"], exact: true }) //캐싱된 일기 데이터 초기화
    }, [])

    // 사용자 데이터 가져오기 (토큰이 있는 경우)
    const { data: userData, isLoading } = useQuery({
        queryKey: ["user", getCookie("username")],
        queryFn: () =>
            getUser(
                getCookie("username") as string,
                getCookie("accessToken") as string, // 최신 토큰을 사용
            ),
        enabled: !!getCookie("accessToken"), // token이 있을 때만 쿼리 실행
        retry: false, // 토큰 만료 시 재시도하지 않도록 설정
    })

    useEffect(() => {
        console.log(userData)
        if (userData) {
            setUser({
                username: getCookie("username") || "",
                nickname: userData.nickname,
                profilePicture: userData.profilePicture || "",
                interests: userData.interests || [],
                personalities: userData.personalities || "",
            })
        }
    }, [userData]) // data가 바뀔 때마다 실행

    useEffect(() => {
        if (
            user?.interests?.length === 0 &&
            user?.personalities?.length === 0
        ) {
            navigate("/onboarding")
        }
    }, [user])

    if (isLoading) {
        return <Loading />
    }

    return (
        <AuthContext.Provider value={{ logout }}>
            {children} {/* 자식 컴포넌트들이 이 값들을 사용할 수 있도록 */}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth는 AuthContext 내부에서만 사용할 수 있습니다.")
    }
    return context
}
