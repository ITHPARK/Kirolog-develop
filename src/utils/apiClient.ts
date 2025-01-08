import axios from "axios"
import { getCookie } from "@utils/cookieController"
import { refreshToken, getUser } from "@remote/user"

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

apiClient.interceptors.request.use(
    //요청 정보를 담는다.
    (config) => {
        //요청이 전달되기 전에 실행

        return config
    },
    (error) => {
        //요청 오류
        return Promise.reject(error)
    },
)

// 응답 인터셉터 추가
apiClient.interceptors.response.use(
    (response) => response, // 성공적인 응답은 그대로 반환
    async (error) => {
        const errorResponese = error.config
        // 에러를 처리하고 콘솔 로그 제거
        if (axios.isAxiosError(error)) {
            //로그인 api 추적을 하여 에러 처리
            if (errorResponese.url === "/api/accounts/login/") {
                if (error.response?.status === 401) {
                    alert("아이디 또는 비밀번호가 일치하지 않습니다.")
                }

                return
            }

            const getUserUrl = /^\/api\/accounts\/[a-zA-Z0-9]+$/
            if (
                getUserUrl.test(errorResponese.url) &&
                errorResponese.method === "get"
            ) {
                //토큰이 만료되어 401 오류가 났을 때 갱신하기 위한 로직
                if (error.response?.status === 401) {
                    const refreshTokenValue = getCookie("refreshToken")

                    if (refreshTokenValue != null) {
                        try {
                            const refreshResponse =
                                await refreshToken(refreshTokenValue)
                            document.cookie = `accessToken=${refreshResponse.access}`

                            // 리프레시 후, 원래의 요청을 갱신된 토큰으로 다시 보냄
                            errorResponese.headers["Authorization"] =
                                `Bearer ${refreshResponse.access}`
                            return apiClient(errorResponese) // getUser 요청을 재전송
                        } catch (refreshError) {
                            console.error(
                                "리프레시 토큰 갱신 실패:",
                                refreshError,
                            )
                        }
                    }
                }

                return
            }

            if (errorResponese.url === "/api/accounts/token/refresh/") {
                if (error.response?.status === 401) {
                    console.error("토큰 갱신에 실패하였습니다.")

                    return Promise.reject({
                        message: "리프레시 토큰 갱신 실패",
                        status: 401,
                    })
                }
            }
            if (process.env.NODE_ENV !== "production") {
                console.error("API 요청 실패:", error) // 개발 환경에서만 출력
            }
            alert("데이터 요청 중 오류가 발생하였습니다.")
        } else {
            alert("예상치 못한 오류가 발생했습니다.")
        }
        return Promise.reject(error) // 에러를 상위로 전달
    },
)

export default apiClient
