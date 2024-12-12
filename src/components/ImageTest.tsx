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

        //엔드포인트로 파일과 함께 api 요청보내기
        try {
            const response = await axios.put(
                'https://test-kilolog.s3.amazonaws.com/youngkyu/2024-12-15/test_image.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA6ODU3QT77ZX2ANH4%2F20241212%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20241212T002901Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=content-type%3Bhost&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkYwRAIgMoU8DWRgHrLa7uMTUcSVSbeZUHXzCs71l0BtjcnhATkCIF1QvWesKaU9M%2F%2FlUwDh770A%2B3Fz6kHdwBUgf66CvcOqKooDCLL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMOTkyMzgyNTE4NTI3Igw0fMHdEfSZNpAbiVEq3gIPntApR5BjJ2YYQ0cVFVsTN2XrIxgIPxFyEkI0UyMdgJxk76m4gVHOqlAsWkucY04Q0ef3XPoQ%2FPRGL6yOnGc39zaPxdx%2F8sDG9%2FsYyJWtKJ6E9d%2FXzg1duGbsD0Kxri6B0pog%2FTGPkW%2B9JnV9ZMCG2e4efRON9DDLbk%2FZq7UEuDqt4vbluRIfenUkpxNJsx7HLrIjsUTWo2N26G8jZl87ajt3chU5DtmHUGaLoqL57JHCv9JsbGZDiHm8LQuSrnzYOh4KAjtpgSh1n3ILZji%2FzrgGnl2ABkeAgK%2BRMnYFqptBxbDRJ5nOtX1WuJEcUpWYXcrbNZsuhpbkOzGQwsglFHXZAVmSDru1XMaJrXfaC%2BJ0n4hdtGbDcpu1gBlJIsDnsfC2CJyB0qvwx2%2Bu7b3sveWwt7IpNqMsaPEToT41hfapb2TTG0OsE6bZlLb%2F%2B0TJhIboawge%2BGpO6O3h9DDK3Oi6BjqfAf7bPDcqNdbvjEpzeUMCgA2yXUkyy%2B1Eda1ZIbL3ll8JF2jGLSJslFLSf9MjR2BjliJ6fXJ7LJTUpI4FYig2Kh9yCAKcmPB18Nk0PDCJSQPsNHeyYLVaI5y%2FC2W2W6xe60sRR1Y%2BDur0bEE3DhUwxn2pz02cBVONPdt%2BCXaTzYq0KnNxYpO0ic6%2FvnK7XY7glTDOvjMGA%2BIAZMnCPf1Ajw%3D%3D&X-Amz-Signature=284b5a7d4d6756451f33bc9cde524ef4676bf3e156f64e5f7436da52bc28317b',
                image,
                {
                    headers: {
                        'Content-Type': 'image/jpeg',
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
