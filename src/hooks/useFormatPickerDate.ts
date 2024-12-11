const useFormatPickerDate = (date: Date) => {
    const year = date.getFullYear() // 연도
    const month = date.getMonth() + 1 // 월 (0부터 시작하므로 1을 더함)

    return `${year}.${month < 10 ? `0${month}` : month}` // 월이 10 미만일 때 앞에 0을 붙여줌
}

export default useFormatPickerDate
