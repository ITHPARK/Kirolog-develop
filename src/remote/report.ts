import axios from "axios"
import { getCookie } from "@utils/cookieController"
import { WeeklyReportProps } from "@models/report"

interface getReportProps {
    week: string | null
    date: Date
}

export const getReport = async ({
    week,
    date,
}: getReportProps): Promise<WeeklyReportProps[]> => {
    try {
        const response = await axios(
            `${process.env.REACT_APP_API_URL}/api/diaries/statistics?year=${date.getFullYear()}&month=${date.getMonth() + 1}&basedate=${week}`,
            {
                headers: {
                    Authorization: `Bearer ${getCookie("accessToken")}`,
                    "Content-Type": "application/json",
                },
            },
        )

        return response.data
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response)
            alert("데이터 요청중 에러가 발생하였습니다.")
        } else {
            // 기타 에러 처리
            alert("예상치 못한 오류가 발생했습니다.")
        }
        throw e
    }
}

// - 특정 월 조회
// api/diaries/statistics?year=2024&month=12&basedate='2024-12-01', '2024-12-08', '2024-12-15', '2024-12-22', '2024-12-29’
