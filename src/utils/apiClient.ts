import axios from "axios"

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

// 응답 인터셉터 추가
apiClient.interceptors.response.use(
    (response) => response, // 성공적인 응답은 그대로 반환
    (error) => {
        // 에러를 처리하고 콘솔 로그 제거
        if (axios.isAxiosError(error)) {
            if (process.env.NODE_ENV !== "production") {
                console.error("API 요청 실패:", error) // 개발 환경에서만 출력
            }
            // 추가 로직: 상태 코드별 처리
            if (error.response?.status === 401) {
                alert("인증 정보가 만료되었습니다. 다시 로그인해주세요.")
            } else {
                alert("데이터 요청 중 오류가 발생하였습니다.")
            }
        } else {
            alert("예상치 못한 오류가 발생했습니다.")
        }
        return Promise.reject(error) // 에러를 상위로 전달
    },
)

export default apiClient
