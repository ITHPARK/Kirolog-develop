export const getCookie = (cookieName: string) => {
    const cookies = document.cookie

    const value = cookies
        .split(';')
        .map((key) => key.trim())
        //startsWith: 배열에서 특정문자열로 시작하는 항목을 찾는다.cookie.trim()
        .find((key) => key.startsWith(cookieName))

    return value ? value.split('=')[1] : null
}

export const deleteCookie = (cookieName: string) => {
    //쿠키의 시간을 만료시킨다. path는 모든 경로에서 쿠키를 삭제할 수 있도록 한다.
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}
