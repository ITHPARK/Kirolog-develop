import { CreateUserInfo, SigninProps } from "@/models/user"

import axios from "axios"
import { getCookie } from "@utils/cookieController"

//회원가입 요청
export const createAccount = async (userData: CreateUserInfo) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/accounts/signup/`,
            userData, //{유저아이디, 패스워드}
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        )

        return response.data
    } catch (e) {
        // 에러를 상위로 전달
        if (axios.isAxiosError(e)) {
            console.error("Axios 에러:", e.response?.data || e.message)
        } else {
            console.error("미확인 error:", e)
        }
        throw e
    }
}

export const login = async (userData: SigninProps) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/accounts/login/`,
            userData, //{유저아이디, 패스워드}
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        )

        return response.data
    } catch (e) {
        // 에러를 상위로 전달
        if (axios.isAxiosError(e)) {
            console.error("Axios 에러:", e.response?.data || e.message)
        } else {
            console.error("미확인 error:", e)
        }
        throw e
    }
}

export const getUser = async (username: string, accessToken: string) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/accounts/${username}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        )

        return response.data
    } catch (e) {
        // 에러를 상위로 전달
        if (axios.isAxiosError(e)) {
            if (e.status === 401) {
                console.log("토큰 만료 에러")
            }
            console.error("Axios 에러:", e.response?.data || e.message)
        } else {
            console.error("미확인 error:", e)
        }
        throw e
    }
}

export const refreshToken = async (refresh: string) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/accounts/token/refresh/`,
            { refresh: refresh },
            {
                headers: {
                    Authorization: `Bearer ${refresh}`,
                },
            },
        )
        return response.data
    } catch (e) {
        // 에러를 상위로 전달
        if (axios.isAxiosError(e)) {
            console.error("Axios 에러:", e.response?.data || e.message)
        } else {
            console.error("미확인 error:", e)
        }
        throw e
    }
}

export const replaceNickName = async (user: string, after: string) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/api/accounts/update-nickname/${user}/`,
            { nickname: after },
            {
                headers: {
                    Authorization: `Bearer ${getCookie("accessToken")}`,
                },
            },
        )

        return response.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error("Axios 에러:", e.response?.data || e.message)
        } else {
            console.error("미확인 error:", e)
        }
        throw e
    }
}

export const deleteUser = async (user: string) => {
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_API_URL}/api/accounts/${user}/`,
            {
                headers: {
                    Authorization: `Bearer ${getCookie("accessToken")}`,
                },
            },
        )

        return response.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error("Axios 에러:", e.response?.data || e.message)
        } else {
            console.error("미확인 error:", e)
        }
        throw e
    }
}

export const addOnboarding = async (data: { [key: string]: string[] }) => {
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/api/accounts/onboarding/`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${getCookie("accessToken")}`,
                },
            },
        )

        return response.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error("Axios 에러:", e.response?.data || e.message)
        } else {
            console.error("미확인 error:", e)
        }
        throw e
    }
}

export const duplicationCheck = async (userName: string) => {
    try {
        const duplicate = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/accounts/check/username?username=${userName}`,
        )

        return duplicate.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            alert("데이터를 요청하는 중 에러가 발생하였습니다.")
            console.error("Axios 에러:", e.response?.data || e.message)
        } else {
            console.error("미확인 error:", e)
        }
        throw e
    }
}
