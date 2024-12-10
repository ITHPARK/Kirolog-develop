import React, { useState } from 'react'
import Input from '@shared/Input'
import axios from 'axios'

const ImageTest = () => {
    const [image, setImage] = useState<File | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] // Optional chaining으로 첫 번째 파일을 선택
        console.log(selectedFile)

        if (selectedFile) {
            setImage(selectedFile) // 파일이 존재할 경우 setImage 호출
        } else {
            console.log('No file selected')
        }
    }

    const handleUpload = async () => {
        console.log(image)
        if (!image) {
            alert('이미지를 선택해주세요.')
            return
        }

        const formData = new FormData()
        formData.append('file', image)

        try {
            const response = await axios.post(
                ' https://test-kilolog.s3.amazonaws.com/youngkyu/2024-12-10/test_image.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA6ODU3QT72WGEK4DK%2F20241210%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20241210T145908Z&X-Amz-Expires=8640&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkgwRgIhAPKJArY0cOFCJNdm5VZrJQqjrT8t9SYQZKT%2FFfr0kYZ6AiEA%2FY%2FxZNnpFK%2BtpoLcrtRIadb7pWao5hHVnQpc%2Ffr3rgwqigMIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5OTIzODI1MTg1MjciDHTM7T0DZsGR47ZU0CreAowIuZEdV%2F%2Fqyb7saE4QO5Kn%2F3baRctDbXrJKxlBKyLWAe%2FFv%2F3tiWoWFkxyDZYN6usrvNHlOARHhLYaPXBBgAAvNHEw5x9vK%2FNWoYclnV9PDhc05qT%2BJXMxHZbp9AIkdllhz1wrR%2FtEuf59le58ju2%2BTbwcFjhA28i7eUGNjOREywYi%2Fw%2BgUE2ExrBRgbZ7%2BqLyj6Wjg0Eyu%2F0kC5sX1jC9S78muqGSIAho3KhIGrbJktqwDtwLw4ND%2FO5JewtL%2FAfVgu2RMrppJkltTE%2FXoimn5HKchrrLKvVVfKRf3SLWZPwNgamQfgwNRq9CoEqX1KplzAZqJ0AjtzKzkgbWPV7Q%2FD8xqM65pM1dPNoy3pikEZ%2FfHctSD3JQfq8nvfzLTf%2BErJXKsFFDjpFnEJa9uAUz1%2FaE%2FBWcjVHuy9ya6e6ZRyL%2BOnUVJobpGo4GjXG7XhHryvpcGhTz0VDwxmzJMLmu4boGOp0BQJqoWTctl8OmcY4McdtQf8SRD253j9sItKs2xweHj0mgqeOBaZ7OQzUxRqPvc1joTvYG7ctMUPYPN25%2FmiJZ9MaJytgsU8YvissDwa6nywrI4MWsNSlW9DFt5J%2BXZlu%2BqAudARTAXWWWIOAlHGw%2FkkrpncEowQCODBWP5pj6OzHea4M3EcY3olwaUBTxXc%2Fote0W5M5sfhZcWiCGsw%3D%3D&X-Amz-Signature=7077f76822b4816e60d0fc5f790fab2c7623752d00053fc75d86d54a52f50734',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            console.log('파일 업로드 성공:', response.data)
        } catch (e) {
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
