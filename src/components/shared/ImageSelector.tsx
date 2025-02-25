import Flex from "@shared/Flex"
import Spacing from "@shared/Spacing"
import Text from "@shared/Text"
import { createPortal } from "react-dom"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { useAddDiaryStep } from "@store/useAddDiary"
import { useCallback } from "react"

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
    const { setStep } = useAddDiaryStep()

    const $portal = document.getElementById("bottomButton")

    const convertImage = async (
        file: File,
        format: string = "image/jpeg",
        quality: number = 0.7, // 압축 품질
        maxWidth: number = 800, // 최대 너비 제한
    ) => {
        // Blob 객체는 파일을 저장할 수 있음
        return new Promise<Blob>((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (event) => {
                const img = new Image()

                img.onload = () => {
                    //이 안에서 img.src를 실행하면 안된다. (이미 이미지는 업로드 되었는데 다시 새로운 이미지를 로딩하게 할 수 있다.)

                    let width = img.width
                    let height = img.height

                    if (width > maxWidth) {
                        height *= maxWidth / width
                        width = maxWidth
                    }

                    const canvas = document.createElement("canvas")
                    canvas.width = width
                    canvas.height = height

                    const ctx = canvas.getContext("2d")

                    if (!ctx)
                        return reject(
                            new Error("캔버스 컨텍스트를 사용할 수 없습니다."),
                        )

                    ctx.drawImage(img, 0, 0, width, height)

                    canvas.toBlob(
                        (blob) => {
                            if (blob) resolve(blob)
                        },
                        format,
                        quality,
                    )
                }

                // 에러처리
                img.onerror = (error) => reject(error)

                // onload 설정 후 src 할당
                img.src = event.target?.result as string
            }

            reader.onerror = (error) =>
                reject(() => {
                    console.log(error)
                })

            // 객체를 Url로 변환
            reader.readAsDataURL(file)
        })
    }

    //선택한 이미지 파일 가져와서 부모에게 전달하는 함수
    const handleSetImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        //선택한 이미지

        const image = e.target.files?.[0]

        if (!image) return

        try {
            //부모 함수의 파라미터로 전달

            const resizedBlob = await convertImage(image, "image/webp")

            const resizedFile = new File([resizedBlob], image.name, {
                type: "image/webp",
            })

            onSetImage(resizedFile)
        } catch (error) {
            throw Error(error as string)
        }
    }

    const handleClickSkip = () => {
        setStep(1)
    }
    if ($portal == null) {
        return null
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
