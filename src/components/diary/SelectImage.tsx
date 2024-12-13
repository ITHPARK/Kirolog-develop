import { useAddDiaryData, useAddDiaryStep } from '@store/useAddDiary'
import { useEffect, useState } from 'react'

import Flex from '@shared/Flex'
import ImageSelector from '@shared/ImageSelector'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import Topbar from '../shared/Topbar'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const SelectImage = () => {
    const { step, setStep } = useAddDiaryStep()
    const { diaryData, setDiaryData } = useAddDiaryData()

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
                    <RequierContainer
                        display="inline-block"
                        typography="t1"
                        weight="semiBold"
                        color="gray800"
                        align="center"
                    >
                        필수
                    </RequierContainer>
                </Flex>
                <Spacing size={8} />
                <Flex direction="column" align="center">
                    <Image />
                    <Spacing size={5} />
                    <Text
                        typography="t4"
                        weight="bold"
                        color="gray800"
                        align="center"
                    >
                        현재 감정을 표현할 <br />
                        <span css={textcustom}>본인이 찍은 </span>
                        사진을 올려주세요
                    </Text>
                </Flex>
            </Flex>
            <ImageSelector
                onSetImage={handleSetImage}
                description={true}
                skipButton={true}
            />
        </>
    )
}

const RequierContainer = styled(Text)`
    padding: 6px 13px;
    background-color: var(--gray100);
    border-radius: 12px;
`

const Image = styled.div`
    width: 123px;
    height: 168px;
    background: url('/images/character/addImage_character.png') no-repeat center;
    background-size: 100% auto;
`

const textcustom = css`
    display: inline-block;
    font-size: 20px;
    font-weight: 700;
    color: var(--primary400);
`

export default SelectImage
