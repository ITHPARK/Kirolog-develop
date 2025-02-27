import { useAddDiaryData, useAddDiaryStep } from "@store/useAddDiary"

import Flex from "@shared/Flex"
import ImageSelector from "@shared/ImageSelector"
import Spacing from "@shared/Spacing"
import Text from "@shared/Text"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { useLocation } from "react-router-dom"
import { ReactComponent as UploadImage } from "@assets/icons/addImage_character.svg"

const SelectImage = ({ skipButton = false }: { skipButton?: boolean }) => {
    const { setStep } = useAddDiaryStep()
    const { diaryData, setDiaryData } = useAddDiaryData()

    const location = useLocation()

    const handleSetImage = (item: File) => {
        //이미지를 선택했다면 전역 상태관리에 저장
        if (item) {
            setDiaryData({ ...diaryData, image: item })
            //다음 스텝으로
            setStep(1)
        }
    }

    return (
        <>
            <Flex direction="column" justify="center">
                <Spacing size={100} />
                <Flex justify="center">
                    {location.pathname.split("/")[3] === "ai" ? (
                        <RequierContainer
                            display="inline-block"
                            typography="t1"
                            weight="semiBold"
                            color="gray800"
                            align="center"
                        >
                            필수
                        </RequierContainer>
                    ) : (
                        <Spacing size={28} />
                    )}
                </Flex>
                <Spacing size={8} />
                <Flex direction="column" align="center">
                    <UploadImage width={123} height={168} />
                    <Spacing size={5} />
                    <Text
                        typography="t4"
                        weight="bold"
                        color="gray800"
                        align="center"
                    >
                        {location.pathname.split("/")[3] === "ai" ? (
                            <>
                                현재 감정을 표현할 <br />
                                <span css={textcustom}>본인이 찍은 </span>
                                사진을 올려주세요
                            </>
                        ) : (
                            <>
                                현재 감정을 표현할
                                <br />
                                사진을 올려주세요.
                            </>
                        )}
                    </Text>
                </Flex>
            </Flex>
            <ImageSelector
                onSetImage={handleSetImage}
                description={
                    location.pathname.split("/")[3] === "ai" ? true : false
                }
                skipButton={skipButton}
            />
        </>
    )
}

const RequierContainer = styled(Text)`
    padding: 6px 13px;
    background-color: var(--gray100);
    border-radius: 12px;
`
const textcustom = css`
    display: inline-block;
    font-size: 20px;
    font-weight: 700;
    color: var(--primary400);
`

export default SelectImage
