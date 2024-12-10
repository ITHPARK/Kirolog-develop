//날짜를 YYYY-MM-DD로 나누는 함수

const useFormatDate = () => {
    const formatData = (date: Date) => {
        const format = date
            .toLocaleDateString()
            .replace(/\s/g, '') // 모든 공백 제거
            .replace(/\.$/, '') // 끝에 있는 '.' 제거
            .replace(/\./g, '-') // '.'을 '-'로 변경
            .replace(/\b(\d)\b/g, '0$1') // 한 자릿수 숫자를 두 자릿수로 변경

        return format
    }

    return formatData
}

export default useFormatDate
