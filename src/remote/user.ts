import apiClient from "@utils/apiClient"
import { CreateUserInfo, SigninProps } from "@/models/user"
import { getCookie } from "@utils/cookieController"

// 회원가입 요청
export const createAccount = async (userData: CreateUserInfo) => {
    const response = await apiClient.post("/api/accounts/signup/", userData)
    return response.data
}

// 로그인 요청
export const login = async (userData: SigninProps) => {
    const response = await apiClient.post("/api/accounts/login/", userData)
    return response.data
}

// 사용자 정보 요청
export const getUser = async (username: string, accessToken: string) => {
    const response = await apiClient.get(`/api/accounts/${username}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    })
    return response.data
}

// 토큰 갱신
export const refreshToken = async (refresh: string) => {
    const response = await apiClient.post("/api/accounts/token/refresh/", {
        refresh,
    })
    return response.data
}

// 닉네임 변경
export const replaceNickName = async (user: string, after: string) => {
    const response = await apiClient.put(
        `/api/accounts/update-nickname/${user}/`,
        { nickname: after },
        { headers: { Authorization: `Bearer ${getCookie("accessToken")}` } },
    )
    return response.data
}

// 사용자 삭제
export const deleteUser = async (user: string) => {
    const response = await apiClient.delete(`/api/accounts/${user}/`, {
        headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
    })
    return response.data
}

// 온보딩 데이터 추가
export const addOnboarding = async (data: { [key: string]: string[] }) => {
    const response = await apiClient.put("/api/accounts/onboarding/", data, {
        headers: { Authorization: `Bearer ${getCookie("accessToken")}` },
    })
    return response.data
}

// 중복 확인
export const duplicationCheck = async (userName: string) => {
    const response = await apiClient.get(
        `/api/accounts/check/username?username=${userName}`,
    )
    return response.data
}
