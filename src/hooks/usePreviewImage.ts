const usePreviewImage = () => {
    const ImageFileState = (
        imageData: File,
        callback: (result: string | null) => void,
    ) => {
        const reader = new FileReader()

        // 파일을 Base64로 변환
        reader.readAsDataURL(imageData)

        // 변환 완료 시 콜백 호출
        reader.onloadend = () => {
            const result = reader.result

            //string 타입 이여야 이미지임
            if (typeof result === 'string') {
                callback(result) //결과값을 콜백의 파라미터로 보낸다.
            } else {
                callback(null) // null 또는 ArrayBuffer인 경우 안전 처리
            }
        }
    }

    return ImageFileState
}

export default usePreviewImage
