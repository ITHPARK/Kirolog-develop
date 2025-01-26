import Flex from "@shared/Flex"
import Spacing from "@shared/Spacing"
import Text from "@shared/Text"
import { createPortal } from "react-dom"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { useAddDiaryStep } from "@store/useAddDiary"

interface ImageSelectorProps {
    onSetImage: (item: File) => void
    skipButton?: boolean
    description?: boolean
}

const ImageSelector = ({
    onSetImage,
    skipButton = false,
    description,
}: ImageSelectorProps) => {
    const { step, setStep } = useAddDiaryStep()

    const $portal = document.getElementById("bottomButton")

    if ($portal == null) {
        return null
    }

    //선택한 이미지 파일 가져와서 부모에게 전달하는 함수
    const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        //선택한 이미지

        const image = e.target.files?.[0]

        if (image) {
            //부모 함수의 파라미터로 전달
            onSetImage(image)
        }
    }

    const handleClickSkip = () => {
        setStep(1)
    }

    return createPortal(
        <ImageAddContainer>
            {description && (
                <>
                    <Text
                        typography="t1"
                        weight="regular"
                        color="gray600"
                        align="center"
                    >
                        나의 감정과 관련된 사진일수록 AI 일기의 정확도가 UP!
                    </Text>
                    <Spacing size={16} />
                </>
            )}
            <Flex
                css={css`
                    gap: 8px;
                `}
            >
                {skipButton && (
                    <ButtonItem
                        css={css`
                            background: var(--gray200);
                        `}
                        justify="center"
                        align="center"
                        onClick={handleClickSkip}
                    >
                        <Text
                            typography="t2"
                            weight="bold"
                            color="gray600"
                            align="center"
                        >
                            건너뛰기
                        </Text>
                    </ButtonItem>
                )}

                <ButtonItem>
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/gif, image/bmp, image/webp"
                        id="diary_image"
                        css={css`
                            display: none;
                        `}
                        onChange={handleSetImage}
                    />
                    <ImageAddLabel htmlFor="diary_image">
                        <Text
                            typography="t2"
                            weight="bold"
                            color="white"
                            align="center"
                        >
                            사진 올리기
                        </Text>
                    </ImageAddLabel>
                </ButtonItem>
            </Flex>
        </ImageAddContainer>,
        $portal,
    )
}

const ImageAddContainer = styled.div`
    width: 100%;
    padding: 20px 18px 54px;
    backgroundcolor: #fff;
`

const ButtonItem = styled(Flex)`
    flex: 1;
    border-radius: 8px;
    overflow: hidden;
`

const ImageAddLabel = styled.label`
    padding: 14px 27px;
    width: 100%;
    height: 100%;
    display: block;
    background-color: var(--gray800);
`

export default ImageSelector
