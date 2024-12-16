import { css } from '@emotion/react'
import styled from '@emotion/styled'

const DiaryImageBox = ({
    imageSrc,
}: {
    imageSrc: string | null | ArrayBuffer
}) => {
    return (
        <ImageBox>
            <img
                src={typeof imageSrc === 'string' ? imageSrc : undefined}
                alt="다이어리 이미지"
                css={diaryImage}
            />
        </ImageBox>
    )
}

const ImageBox = styled.div`
    width: 100%;
    height: 335px;
    border-radius: 8px;
    overflow: hidden;
`

const diaryImage = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export default DiaryImageBox
