import { CreateUserInfo, SigninProps } from "@/models/user"
import { getCookie } from "@utils/cookieController"
import apiClient from "@utils/apiClient"

//회원가입 요청
export const createAccount = async (userData: CreateUserInfo) => {
    const response = await apiClient.post(
        `/api/accounts/signup/`,
        userData, //{유저아이디, 패스워드}
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
    )

    return response.data
}

export const login = async (userData: SigninProps) => {
    const response = await apiClient.post(
        `/api/accounts/login/`,
        userData, //{유저아이디, 패스워드}
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
    )

    return response.data
}

export const getUser = async (username: string, accessToken: string) => {
    const response = await apiClient.get(`/api/accounts/${username}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    return response.data
}

export const refreshToken = async (refresh: string) => {
    const response = await apiClient.post(
        `/api/accounts/token/refresh/`,
        { refresh: refresh },
        {
            headers: {
                Authorization: `Bearer ${refresh}`,
            },
        },
    )
    return response.data
}

export const replaceNickName = async (user: string, after: string) => {
    const response = await apiClient.put(
        `/api/accounts/update-nickname/${user}/`,
        { nickname: after },
        {
            headers: {
                Authorization: `Bearer ${getCookie("accessToken")}`,
            },
        },
    )

    return response.data
}

export const deleteUser = async (user: string) => {
    const response = await apiClient.delete(`/api/accounts/${user}/`, {
        headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
        },
    })

    return response.data
}

export const addOnboarding = async (data: { [key: string]: string[] }) => {
    const response = await apiClient.put(`/api/accounts/onboarding/`, data, {
        headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
        },
    })

    return response.data
}

export const duplicationCheck = async (userName: string) => {
    const duplicate = await apiClient.get(
        `/api/accounts/check/username?username=${userName}`,
    )

    return duplicate.data
}
