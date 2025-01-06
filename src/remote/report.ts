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
}

// - 특정 월 조회
// api/diaries/statistics?year=2024&month=12&basedate='2024-12-01', '2024-12-08', '2024-12-15', '2024-12-22', '2024-12-29’
