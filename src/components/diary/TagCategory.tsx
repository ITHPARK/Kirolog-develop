import { useAddDiaryData, useAddDiaryStep } from '@store/useAddDiary'

import Alert from '@shared/Alert/Alert'
import ArrowLeft from '@shared/ico/ArrowLeft'
import Close from '@shared/ico/Close'
import DiaryTop from '@components/diary/DiaryTop'
import Flex from '@shared/Flex'
import Input from '@shared/Input'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import Topbar from '../shared/Topbar'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useAlertContext } from '@context/AlertContext'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const TagCategory = () => {
    const { step, setStep } = useAddDiaryStep()
    const { diaryData, setDiaryData } = useAddDiaryData()
    const { open } = useAlertContext()
    const navigate = useNavigate()

    // 폼 데이터 타입 지정
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ emotion: string }>({
        mode: 'onChange',
    })

    // 폼 제출 함수
    // 감정 선택 핸들러
    const handleEmotionChange = (emotion: string) => {
        setDiaryData({ ...diaryData, mood: emotion })
        setStep(1) // 바로 다음 스텝으로 이동
    }

    return (
        <>
            <Spacing size={30} />
            <Flex direction="column">
                <Text typography="t4" weight="bold" color="gray800">
                    지금 느끼는 감정을 선택해주세요.
                </Text>
                <Spacing size={4} />
                <Text typography="t2" weight="regular" color="gray500">
                    1가지 감정만 선택할 수 있어요.
                </Text>
            </Flex>

            <CatgoryContainer direction="column">
                <div>
                    <CategoryTitle
                        typography="t2"
                        weight="bold"
                        color="gray700"
                    >
                        희
                    </CategoryTitle>
                </div>
                <Spacing size={16} />
                <Flex
                    as="ul"
                    css={css`
                        gap: 12px 8px;
                        flex-wrap: wrap;
                    `}
                >
                    <li>
                        <Input
                            id="cat1"
                            type="radio"
                            value="기쁨"
                            css={inputStyles}
                            onChange={() => handleEmotionChange('기쁨')}
                        />
                        <LabelBox htmlFor="cat1">기쁨</LabelBox>
                    </li>
                    <li>
                        <Input
                            id="cat2"
                            type="radio"
                            value="설렘"
                            css={inputStyles}
                            onChange={() => handleEmotionChange('설렘')}
                        />
                        <LabelBox htmlFor="cat2">설렘</LabelBox>
                    </li>
                    <li>
                        <Input
                            id="cat3"
                            type="radio"
                            value="뿌듯함"
                            css={inputStyles}
                            onChange={() => handleEmotionChange('뿌듯함')}
                        />
                        <LabelBox htmlFor="cat3">뿌듯함</LabelBox>
                    </li>
                    <li>
                        <Input
                            id="cat4"
                            type="radio"
                            value="감동"
                            css={inputStyles}
                            onChange={() => handleEmotionChange('감동')}
                        />
                        <LabelBox htmlFor="cat4">감동</LabelBox>
                    </li>
                    <li>
                        <Input
                            id="cat5"
                            type="radio"
                            value="만족감"
                            css={inputStyles}
                            onChange={() => handleEmotionChange('만족감')}
                        />
                        <LabelBox htmlFor="cat5">만족감</LabelBox>
                    </li>
                </Flex>
            </CatgoryContainer>
            {errors.emotion && (
                <Text typography="t3" color="red">
                    감정을 선택해주세요.
                </Text>
            )}
        </>
    )
}

const inputStyles = css`
    &:checked + label {
        background-color: #4caf50;
    }
`

const CatgoryContainer = styled(Flex)`
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--gray100);
`

const CategoryTitle = styled(Text)`
    padding: 8px 15px;
    display: inline-block;
`

const LabelBox = styled.label`
    display: block;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    color: var(--gray700);
    line-height: 1.5;
    border-radius: 32px;
    background: var(--gray100);
    white-space: nowrap;
`

export default TagCategory
