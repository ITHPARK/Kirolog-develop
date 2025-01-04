export const getWeekLabel = (index: number, totalWeeks: number) => {
    const weekNumber = totalWeeks - index
    const labels = [
        "첫째 주",
        "둘째 주",
        "셋째 주",
        "넷째 주",
        "다섯째 주",
        "여섯째 주",
    ]
    return labels[weekNumber - 1] || `${weekNumber}주`
}
