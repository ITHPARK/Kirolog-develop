import React, { useState } from 'react'
import Input from '@shared/Input'
import axios from 'axios'

const ImageTest = () => {
    //파일이 저장될 state
    const [image, setImage] = useState<File | null>(null)

    //input에서 파일을 선택하고 선택한 파일을 state에 업데이트
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] // Optional chaining으로 첫 번째 파일을 선택
        console.log(selectedFile)

        if (selectedFile) {
            setImage(selectedFile) // 파일이 존재할 경우 setImage 호출
        } else {
            console.log('No file selected')
        }
    }

    //api요청 함수
    const handleUpload = async () => {
        //선택된 이미지가 없다면
        console.log(image)
        if (!image) {
            alert('이미지를 선택해주세요.')
            return
        }

        //FormData 객체를 생성
        const formData = new FormData()
        //이미지 파일 추가
        formData.append('file', image)

        //엔드포인트로 파일과 함께 api 요청보내기
        try {
            const response = await axios.put(
                'https://test-kilolog.s3.amazonaws.com/youngkyu/2024-12-10/test_image.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA6ODU3QT7WHYQOAK2%2F20241211%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20241211T055312Z&X-Amz-Expires=8640&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkcwRQIgdw8w8HTJfP01U7Uo5S5cnC8o7600ssWqPT4lBSxExkUCIQCrsyuSnA7mS3Ab1AU1inMtP5dp%2BuTOyxhHcq%2FSgsEaJiqKAwif%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDk5MjM4MjUxODUyNyIMgeXjwdIUc0aILPAVKt4C%2F6T0MfLTdqTcH4cXti4trdciQT%2BFssYAWQVs%2BZ7Kfmc9Brb2lpUcfqpeeImfwmGF%2F12oH7%2BZEG%2Fb%2BCtpwoJnAXMKE7N2ebAlwV4g8NhFmw9amP1owy%2Bf0Nww0%2BtoAL4%2Fq5YkkALHkS6FCFLFNLga7FHePkZAcOOkZBo9pO%2B8Jpe7qjYZl%2FQxYlxs28hK%2B3mK5nQsrcepEpxtUTsOwqoi3aXuc4jvAalqsFNXV7Xqnd6nq03SYEHMtOcsopDTbt%2B8rwDew7jShgj9hNlzDyeNYJ4ym%2BkKsLDyS9vkZj6PHYtU%2FlhAUZSaLgK2xtNQ9hZBhfmR3C3X75945L5YRFbjjVrzEs%2FTIUhos3ATesLx5BDNZpSw%2FczfDOuKn2fuJPgQCVDojQFjGC52EeQZaR17sIcmRBmNV%2FfALy8CHfpIJaOZeZSdyWQUBq7%2Fi3B5FeZEPeXDJFbd9vE4wmKy5fgwxtHkugY6ngHtc%2FcU4oXp0Gotd11bn3DJlGTecOvageFDTXXnnlwM5qRkEfaiEMS5U5j0I72eFRfsqs88NWhuHD8F4WgUHV1Em%2BMzGrgPhYYN7PRLMCcPgQCUddPqp%2BdeG1JkFzxdKBcbG037Sdl4BjpZd4uxbLQVBixKeN6sDiRouPbDodojnSUVj%2BxeBmescvUVqFZlhS9iTuSjhy4%2BWhf%2BNAI%2BQg%3D%3D&X-Amz-Signature=39f51073fea392d5b1285a9f064b90924f78720c3e84f93eaa45654039d1185e',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            console.log('파일 업로드 성공:', response.data)
        } catch (e) {
            //에러처리
            console.log(e)
        }
    }

    return (
        <div>
            <Input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>api 보내기</button>
        </div>
    )
}

export default ImageTest
